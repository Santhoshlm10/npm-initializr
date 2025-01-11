"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const PackageInfo = () => {

    const form = useForm<z.infer<any>>({
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: any) {
        console.log("values", values)
    }
    return (
        <div>
            <Label className="text-base font-bold">Package Details</Label>
            <div className="mt-2 w-11/12">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter package name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="version"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Version</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter version" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter package description" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="main"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entry Point</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={"index.js"} placeholder="Enter entry point" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="test"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entry Test Command</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter test command" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="keywords"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entry Keywords (comma seperated)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter keywords" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Entry Authour</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter author name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="licence"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Licence</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter licence type" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
};

export default PackageInfo;