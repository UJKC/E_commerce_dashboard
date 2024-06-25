'use client'

import { Store } from "@prisma/client";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "./modals/alert-modal";
import { ApiAlert } from "./ui/api-alert";

interface SettingsFormProps {
    intialdata: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ intialdata }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: intialdata
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true)
            console.log('Here')
            await axios.patch(`/api/stores/${params.storeId}`, data)
            console.log('Here')
            router.refresh()
            toast.success("Store Updated")
        }
        catch (error) {
            console.log(error)
            toast.error("Error in Updating")
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/")
            toast.success("Store deleted.")
        } catch(err) {
            toast.error("Make sure you removed all products and categories first.");
        } finally {
            setLoading(false)
            setOpen(false);
        }
    }

    return(
        <>
            <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
            />
            <div className="flex justify-between">
                <Heading title="Settings" description="Manage Store Prefrences"/>
                <Button variant='destructive' size='sm' onClick={() => setOpen(true)} disabled={loading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store Name..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant='public'/>
        </>
    )
}