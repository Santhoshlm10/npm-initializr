"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
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

    const formSchema = z.object({
        name: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        version: z.string({
            message: "Version is required"
        }),
        description: z.string({
            message: "Description is required"
        }),
        main: z.string({
            message: "main is required"
        }),
        test: z.string({
            message: "test is required"
        }),
        keywords: z.string({
            message: "keywords is required"
        }),
        author: z.string({
            message: "author is required"
        }),
        licence: z.string({
            message: "author is required"
        }),
    
      })
      const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
            version: "",
            description: "",
            main: "",
            test: "",
            keywords: "",
            author: "",
            licence: ""
        },
    })

    function onSubmit(values: Record<string,string>) {
        const res = formSchema["~validate"](values)
        console.log("values", res)
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