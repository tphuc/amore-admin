

import useSWR from 'swr'

import { firestore } from '..'

const ENDPOINT = 'categories'

const fetcher = async (ENDPOINT) => {
    let res = firestore.get()
    if(res.exists){
        return res.data()
    }
}

export default function useCategories() {
    const { data, error } = useSWR(`${ENDPOINT}`, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export const CategoriesCRUD = {
    create: async (data) => {
        let res = firestore.collections(ENDPOINT).add(data)
        return res
    },
    read: async(id) => {
        let res = firestore.collections(ENDPOINT).doc(id).get()
        return res
    },
    update: async (id, data) => {
        let res = firestore.collections(ENDPOINT).doc(id).set(data)
        return res
    },
    delete: async (id) => {
        let res = firestore.collections(ENDPOINT).doc(id).delete()
        return res
    },
}