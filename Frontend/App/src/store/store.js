import { create } from "zustand"

export const useStore = create((set) => ({
    // User state
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    
    // Sign up
    signUp: async (userData) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('http://localhost:3010/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            const data = await response.json()
            
            if (data.STATUS === 'SUCCESS') {
                set({ user: data.DB_DATA.user, isAuthenticated: true, loading: false })
                localStorage.setItem('token', data.DB_DATA.token)
            } else {
                set({ error: data.ERROR_DESCRIPTION, loading: false })
            }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    
    // Sign in
    signIn: async (credentials) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('http://localhost:3010/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            
            if (data.STATUS === 'SUCCESS') {
                set({ user: data.DB_DATA.user, isAuthenticated: true, loading: false })
                localStorage.setItem('token', data.DB_DATA.token)
            } else {
                set({ error: data.ERROR_DESCRIPTION, loading: false })
            }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    
    // Sign out
    signOut: () => {
        set({ user: null, isAuthenticated: false, error: null })
        localStorage.removeItem('token')
    },
    
    // Clear error
    clearError: () => set({ error: null })
}))

export const useListingStore = create((set, get) => ({
    listings: [],
    loading: false,
    error: null,
    
    // Fetch all listings
    fetchListings: async () => {
        set({ loading: true, error: null })
        try {
            console.log('Fetching listings from API...')
            const response = await fetch('http://localhost:3010/api/listings/allListings')
            console.log('Response status:', response.status)
            const data = await response.json()
            console.log('API Response:', data)
            
            if (data.STATUS === 'SUCCESSFUL') {
                console.log('Listings from API:', data.DB_DATA.listings)
                set({ listings: data.DB_DATA.listings || [], loading: false })
            } else {
                console.log('API Error:', data.ERROR_DESCRIPTION)
                set({ error: data.ERROR_DESCRIPTION, loading: false })
            }
        } catch (error) {
            console.log('Fetch Error:', error.message)
            set({ error: error.message, loading: false })
        }
    },
    
    // Create listing
    createListing: async (listingData) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('http://localhost:3010/api/listings/createListing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(listingData)
            })
            const data = await response.json()
            
            if (data.STATUS === 'SUCCESS') {
                const currentListings = get().listings
                set({ listings: [...currentListings, data.DB_DATA.listing], loading: false })
            } else {
                set({ error: data.ERROR_DESCRIPTION, loading: false })
            }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    
    // Filter listings
    filterListings: async (filters) => {
        set({ loading: true, error: null })
        try {
            const queryParams = new URLSearchParams(filters).toString()
            const response = await fetch(`http://localhost:3010/api/listings/filter?${queryParams}`)
            const data = await response.json()
            
            if (data.status === 'success') {
                set({ listings: data.data.listings || [], loading: false })
            } else {
                set({ error: data.message, loading: false })
            }
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    
    // Clear error
    clearError: () => set({ error: null })
}))