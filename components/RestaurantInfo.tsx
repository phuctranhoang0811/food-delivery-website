import { Clock, Truck, Phone } from "lucide-react";

export default function RestaurantInfo() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-[2000px] mx-auto px-8 sm:px-12 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Information - White Card */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FC8A06] text-white rounded-full p-3">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delivery information
              </h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-semibold text-gray-900">Monday:</span>{" "}
                12:00 AM–3:00 AM, 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Tuesday:</span>{" "}
                8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Wednesday:</span>{" "}
                8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Thursday:</span>{" "}
                8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Friday:</span>{" "}
                8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Saturday:</span>{" "}
                8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold text-gray-900">Sunday:</span>{" "}
                8:00 AM–12:00 AM
              </div>
              <div className="pt-3 border-t border-gray-200">
                <span className="font-semibold text-gray-900">
                  Estimated time until delivery:
                </span>{" "}
                20 min
              </div>
            </div>
          </div>

          {/* Contact Information - White Card */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FC8A06] text-white rounded-full p-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Contact information
              </h3>
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-gray-600">
                If you have allergies or other dietary restrictions, please
                contact the restaurant. The restaurant will provide
                food-specific information upon request.
              </p>
              <div>
                <p className="font-semibold mb-1 text-gray-900">Phone number</p>
                <p className="text-[#FC8A06] font-medium text-base">
                  +934443-43
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1 text-gray-900">Website</p>
                <a
                  href="http://mcdonalds.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FC8A06] hover:underline font-medium"
                >
                  http://mcdonalds.uk/
                </a>
              </div>
            </div>
          </div>

          {/* Operational Times - Dark Card (Nổi bật) */}
          <div className="bg-[#03081F] text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#FC8A06] rounded-full p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Operational Times</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold">Monday:</span> 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold">Tuesday:</span> 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold">Wednesday:</span> 8:00 AM–3:00
                AM
              </div>
              <div>
                <span className="font-semibold">Thursday:</span> 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold">Friday:</span> 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold">Saturday:</span> 8:00 AM–3:00 AM
              </div>
              <div>
                <span className="font-semibold">Sunday:</span> 8:00 AM–3:00 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
