import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import useGeoLocation from '../../Hooks/useGeoLocation'
import useUrlLocation from '../../Hooks/useUrlLocation'



function Map({ markerLocation }) {

    const [mapCenter, setMapCenter] = useState([51, 3])
    const [lat, lng] = useUrlLocation()
    const { isLoadingPosition, geoPosition, getPosition } = useGeoLocation()
    console.log(markerLocation)

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng])
    }, [lat, lng])

    useEffect(() => {
        if (geoPosition?.lat && geoPosition?.lng) setMapCenter([geoPosition.lat, geoPosition.lng])
    }, [geoPosition])

    // if (!markerLocation.isLoading) <Loader />

    return (
        <div className="flex-1 -bg--text-100 relative">
            <MapContainer className='h-full' center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <button onClick={getPosition} className='absolute bottom-2 left-2 py-[0.4rem] px-[0.7rem] rounded-lg text-[0.7rem] font-bold -bg--primary-600 
                shadow-[0_0px_10px_rgba(0,0,0,0.2)] -text--white z-[1000] '>
                    {isLoadingPosition ? "Loading ..." : "Use Location"}
                </button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <ChangeCenter position={mapCenter} />
                <DetectClick />
                {markerLocation?.map(item => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>,
        </div>
    )
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}


function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })

    return null
}