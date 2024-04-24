"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

import { formSchema } from "./constants";
import { UserAvatar } from "@/components/user";
import { BotAvatar } from "@/components/bot";

const GeneralPage = () => {
    const router = useRouter();
    const [index, setIndex] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: any = {
                message: values.prompt,
                role: "user"
            }

            const response = await axios.post("http://localhost:5000/2024/chats", {
                text: values.prompt
            });

            const botMessage: any = {
                message: response.data.text,
                role: "bot"
            };

            setIndex(index+1);        
            setMessages((current) => [...current, userMessage, botMessage]);

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return(
        <div>
            <div className="px-4 lg:px-8">
                <div className="p-5 space-x-5 flex-items-end">
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                            rounded-lg
                            border
                            w-full
                            p-4
                            px-3
                            md:px-6
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field}) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                                <Input
                                                    className="
                                                    border-0 outline-none 
                                                    focus-visible:ring-0 
                                                    focus-visible:ring-transparent"
                                                    disabled={isLoading}
                                                    placeholder="Enter a message"
                                                    {...field}
                                                />
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full bg-[#8d1b23]" disabled={isLoading} type="submit">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center
                        justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={message.message + index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black" : "bg-[#D9D9D9]",
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}  
                                <p className="text-sm">
                                    {message.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralPage;