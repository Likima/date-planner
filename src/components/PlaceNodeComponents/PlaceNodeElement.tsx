import { PlaceNode } from "@/src/types/types"

interface PNE_Props {
    item: PlaceNode
}

export function PlaceNodeElement({ item }: PNE_Props) {
    return (
        <div>
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {item.place.displayName?.text || "No Name Provided"}
                    </h2>
                    <p className="text-gray-300 mb-4">
                        {item.place.formattedAddress || 'No address available'}
                    </p>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Date Details</h3>
                    <p>
                        Date: {`${item.date?.month || 'mm'}/${item.date?.day || 'dd'}/${item.date?.year || 'yyyy'}`}
                    </p>
                    <p>
                        Time: {`${item.time?.startTime || 'xx:xx'} - ${item.time?.endTime || 'xx:xx'}`}
                    </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-2">Place Details</h3>
                    {item.place.currentOpeningHours && (
                        <p className="text-gray-300 flex items-center mb-2">
                            <span className={`mr-2 w-3 h-3 rounded-full ${item.place.currentOpeningHours.openNow
                                ? 'bg-green-500'
                                : 'bg-red-500'
                                }`}></span>
                            {item.place.currentOpeningHours.openNow ? 'Open Now' : 'Closed'}
                        </p>
                    )}
                    {item.place.rating && (
                        <p className="text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {item.place.rating} ({item.place.userRatingCount || 0} reviews)
                        </p>
                    )}
                </div>

                {(item.place.websiteUri || item.place.nationalPhoneNumber) && (
                    <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
                        {item.place.nationalPhoneNumber && (
                            <p className="text-gray-300 mb-2">{item.place.nationalPhoneNumber}</p>
                        )}
                        {item.place.websiteUri && (
                            <a
                                href={item.place.websiteUri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Visit Website
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

