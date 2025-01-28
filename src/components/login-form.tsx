"use client"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

interface LoginResponse {
    code: number
    data: {
        email: string
        id: string
        token: string
    }
    message: string
    result: string
}

export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const response = await axios.get("http://localhost:4000/api/user/login/token", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    
                    if (response.data.code === 200) {
                        router.push("/dashboard")
                        return
                    }
                    localStorage.removeItem("token")
                } catch (err) {
                    console.error("Token verification failed:", err)
                    localStorage.removeItem("token")
                }
            }
            setIsLoading(false)
        }

        checkToken()
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        console.log("Login form submitted:", email, password)

        try {
            const response = await axios.post<LoginResponse>("http://localhost:4000/api/user/login", {
                email,
                password,
            })

            if (response.data.code === 200) {
                localStorage.setItem("token", response.data.data.token)
                router.push("/dashboard")
            } else {
                setError(response.data.result || "登录失败")
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.result || "登录请求失败，请稍后重试")
            } else {
                setError("登录请求失败，请稍后重试")
            }
            console.error("Login error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p>加载中...</p>
            </div>
        )
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "登录中..." : "登录"}
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
