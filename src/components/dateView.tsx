"use client"

import { Place, PlaceNode, DateTimeInfo, DateDayInfo } from "../../types"

export function DateView(props: { isShowing: boolean, placeInfo: Place | null, dti: DateTimeInfo | null, ddi: DateDayInfo | null }) {

    if (!props.placeInfo || !props.dti || !props.ddi) return <div>One or more parameters are null!</div>;

    return (
        <div className="overflow-y-auto max-h-screen min-h-screen font-mono flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-purple-300/20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {props.placeInfo.displayName?.text || 'No name available'}
                    </h2>
                    <p className="text-gray-300 mb-4">
                        {props.placeInfo.formattedAddress || 'No address available'}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Date Details</h3>
                        <p className="text-gray-300">
                            Date: {`${props.ddi.month || '--'}/${props.ddi.day || '--'}/${props.ddi.year || '----'}`}
                        </p>
                        <p className="text-gray-300">
                            Time: {props.dti.startTime || '--:--'} - {props.dti.endTime || '--:--'}
                        </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Place Details</h3>
                        {props.placeInfo.currentOpeningHours && (
                            <p className="text-gray-300 flex items-center mb-2">
                                <span className={`mr-2 w-3 h-3 rounded-full ${props.placeInfo.currentOpeningHours.openNow
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                    }`}></span>
                                {props.placeInfo.currentOpeningHours.openNow ? 'Open Now' : 'Closed'}
                            </p>
                        )}
                        {props.placeInfo.rating && (
                            <p className="text-gray-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {props.placeInfo.rating} ({props.placeInfo.userRatingCount || 0} reviews)
                            </p>
                        )}
                    </div>

                    {(props.placeInfo.websiteUri || props.placeInfo.nationalPhoneNumber) && (
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
                            {props.placeInfo.nationalPhoneNumber && (
                                <p className="text-gray-300 mb-2">{props.placeInfo.nationalPhoneNumber}</p>
                            )}
                            {props.placeInfo.websiteUri && (
                                <a
                                    href={props.placeInfo.websiteUri}
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
        </div>
    )
}