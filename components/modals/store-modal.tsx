'use client'

import { useStoreModal } from "@/hooks/create-store-modal"
import { Modal } from "../ui/modal"

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formschema = z.object({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal()

    const [loading, setloading] = useState(false)

    const form = useForm<z.infer<typeof formschema>>({
        resolver: zodResolver(formschema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formschema>) => {
        try {
            console.log(values)
            setloading(true)
            const response = await axios.post('/api/stores', values)
            toast.success("Store Successfully Created!")
        }
        catch(error) {
            toast.error("Something failed!")
        }
        finally {
            setloading(false)
        }
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
                                        <Input disabled={loading} placeholder="E-commerce App" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Close</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}