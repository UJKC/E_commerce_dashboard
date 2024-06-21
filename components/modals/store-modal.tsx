'use client'

import { useStoreModal } from "@/hooks/create-store-modal"
import { Modal } from "../ui/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal()

    return(
        <Modal title="Create Store" description="Add a new store to manage product and category" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            Future Create Store Form
        </Modal>
    )
}