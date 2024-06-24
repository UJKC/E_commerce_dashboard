'use client'

import { useStoreModal } from "@/hooks/create-store-modal"
import { Modal } from "../ui/modal"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const formschema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formschema>) => {
        console.log(values)
    }

    return(
        <Modal title="Create Store" description="Add a new store to manage product and category" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-commerce App" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button variant="outline" onClick={storeModal.onClose}>Close</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}