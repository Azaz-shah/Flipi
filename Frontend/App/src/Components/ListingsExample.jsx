import React, { useEffect } from 'react'
import { useListingsStore, useUIStore } from '../store'

const ListingsComponent = () => {
  const { listings, loading, fetchListings } = useListingsStore()
  const { openModal } = useUIStore()

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id} onClick={() => openModal(listing)}>
          <h3>{listing.title}</h3>
          <p>${listing.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ListingsComponent