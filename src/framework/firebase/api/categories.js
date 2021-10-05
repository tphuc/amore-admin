

import useSWR from 'swr'

import { firestore } from '..'
import { doc, addDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, setDoc } from '@firebase/firestore'

const ENDPOINT = 'categories'

const fetcher = async (ENDPOINT) => {
    let res = await getDocs(collection(firestore, ENDPOINT))
    return res.docs.map(doc => ({ 
        id: doc.id,
        ...doc.data() 
    }))
}

export default function useCategories() {
    const { data, error, mutate } = useSWR(ENDPOINT, fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const CategoriesCRUD = {
    create: async (data) => {
        let res = await addDoc(collection(firestore, ENDPOINT), data)
        return res
    },
    createWithId: async (id, data) => {
        let res = await setDoc(doc(firestore, ENDPOINT, id), data)
        return res
    },
    read: async(id) => {
        let res = await getDoc(doc(firestore, ENDPOINT, id))
        return res
    },
    update: async (id, data) => {
        let res = await updateDoc(doc(firestore, ENDPOINT, id), data)
        return res
    },
    delete: async (id) => {
        let res = await deleteDoc(doc(firestore, ENDPOINT, id))
        return res
    },
}