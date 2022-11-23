
                        :
                        <div className='w-full'>
                            <h2 style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-600 py-2 font-semibold'>One Stop Center Locations found in <span className='capitalize'>{foundLocation}</span></h2>
                            { locationDetails.length > 0?
                                <div className='flex flex-col gap-4'>
                                    {
                                        locationDetails.map(location => {
                                            return (
                                                <div className='w-full shadow rounded-lg'>
                                                    <div className='w-full px-2 py-3'>
                                                        <p style={{fontFamily: `'Lato', sans-serif`}} className='font-semibold text-purple-900 uppercase text-md pb-2'>{location.name}</p>
                                                        <p className='text-sm'><span className='font-semibold'>Address: </span>{location.address}</p>
                                                        <p className='text-sm'><span className='font-semibold'>Phone: </span> <a className='underline text-purple-800' href={`tel:${location.phone}`}>{location.phone}</a></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className='h-full flex justify-center items-center py-20 text-red-500 font-medium italic'>
                                    <p className='max-w-sm'>No One Stop center found in your location. Please, select a different location closer to you.</p>
                                </div>
                            }
                        </div>
                    }
                    </div>
                }
            </div>
            {/* Main Section ends here */}

        </div>
      }
    </div>
  )
}

export default SARC