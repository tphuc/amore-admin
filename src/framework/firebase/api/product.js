

import useSWR from 'swr'

import { firestore } from '..'
import { doc, addDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, setDoc, where, orderBy, limit } from '@firebase/firestore'
import React from 'react'

const ENDPOINT = 'products'

const fetcher = async (ENDPOINT) => {
    let res = await getDocs(collection(firestore, ENDPOINT), orderBy('timestamp', 'desc'), limit(10))
    return res.docs.map(doc => ({ 
        id: doc.id,
        ...doc.data() 
    }))
}

export default function useProducts() {
    const { data, error, mutate } = useSWR(ENDPOINT, fetcher, {
        revalidateOnReconnect:false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
        refreshWhenHidden:false
    })



    const fetchFilter = React.useCallback(async (queryOptions) => {

        const q = query(collection(firestore, ENDPOINT), ...queryOptions);
        let res = await getDocs(q)
        
        let data = res.docs.map(doc => ({ 
            id: doc.id,
            ...doc.data() 
        }))

        return data

    }, [])

    return {
        fetchFilter,
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const ProductsCRUD = {
    create: async (data) => {
        let res = await addDoc(collection(firestore, ENDPOINT), data)
        return res
    },
    createWithId: async (id, data) => {
        let res = await setDoc(collection(firestore, ENDPOINT, id), data)
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