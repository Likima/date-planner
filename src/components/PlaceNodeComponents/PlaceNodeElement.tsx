import { PlaceNode } from "@/types"

interface PNE_Props {
    item: PlaceNode
}

export function PlaceNodeElement({ item }: PNE_Props) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 rounded-xl border border-purple-300/20 shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="px-8 py-6 border-b border-purple-300/10">
                    <h2 className="text-4xl font-bold text-white text-center bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                        {item.place.displayName?.text || "No Name Provided"}
                    </h2>
                    <p className="text-gray-300 text-center mt-2 font-light">
                        {item.place.formattedAddress || 'No address available'}
                    </p>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6">
                    {/* Date Details */}
                    <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Date Details
                        </h3>
                        <div className="space-y-2 text-gray-300">
                            <p className="flex items-center">
                                <span className="w-20 text-gray-400">Date:</span>
                                {`${item.date?.month || 'mm'}/${item.date?.day || 'dd'}/${item.date?.year || 'yyyy'}`}
                            </p>
                            <p className="flex items-center">
                                <span className="w-20 text-gray-400">Time:</span>
                                {`${item.time?.startTime || 'xx:xx'} - ${item.time?.endTime || 'xx:xx'}`}
                            </p>
                        </div>
                    </div>

                    {/* Place Details */}
                    <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Place Details
                        </h3>
                        {item.place.currentOpeningHours && (
                            <div className="flex items-center mb-3">
                                <span className={`w-3 h-3 rounded-full ${item.place.currentOpeningHours.openNow ? 'bg-green-400' : 'bg-red-400'} mr-2`}></span>
                                <span className="text-gray-300">{item.place.currentOpeningHours.openNow ? 'Open Now' : 'Closed'}</span>
                            </div>
                        )}
                        {item.place.rating && (
                            <div className="flex items-center text-gray-300">
                                <svg className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{item.place.rating}</span>
                                <span className="text-gray-400 ml-2">({item.place.userRatingCount || 0} reviews)</span>
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    {(item.place.websiteUri || item.place.nationalPhoneNumber) && (
                        <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                            <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contact
                            </h3>
                            {item.place.nationalPhoneNumber && (
                                <p className="text-gray-300 mb-2">{item.place.nationalPhoneNumber}</p>
                            )}
                            {item.place.websiteUri && (
                                <a
                                    href={item.place.websiteUri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <span>Visit Website</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
