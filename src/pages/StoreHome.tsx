import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Clock, MapPin, Phone } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  points: number;
  image: string;
}

const StoreHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const storeInfo = {
    name: "Morning Brew Coffee",
    description: "Artisanal coffee shop serving specialty coffee and fresh pastries",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8,
    reviewCount: 324,
    hours: "Mon-Sun: 7AM-7PM",
    location: "123 Coffee Lane, Brewtown",
    phone: "+1 (555) 123-4567",
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
        rating: 5,
        comment: "Best coffee in town! The atmosphere is perfect for working or catching up with friends.",
        date: "2 days ago",
        images: ["https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400"]
      },
      {
        id: 2,
        user: "John D.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
        rating: 4,
        comment: "Great service and amazing pastries. The loyalty program is a nice bonus!",
        date: "1 week ago",
        images: []
      }
    ],
    availableRewards: [
      {
        id: 1,
        name: "Free Coffee",
        points: 100,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 2,
        name: "Fresh Bread Loaf",
        points: 250,
        image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400"
      }
    ]
  };

  const handleCreateCard = (rewardId: number) => {
    // In a real app, you would make an API call to create the card
    console.log(`Creating loyalty card for reward ${rewardId}`);
    navigate('/my-cards');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image and Header */}
      <div className="relative h-64 md:h-80">
        <img 
          src={storeInfo.coverImage} 
          alt={storeInfo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <Link 
          to="/"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Store Info Card */}
      <div className="relative -mt-20 mx-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <img 
              src={storeInfo.image} 
              alt={storeInfo.name}
              className="w-24 h-24 rounded-xl object-cover shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{storeInfo.name}</h1>
              <p className="text-gray-600 mt-1">{storeInfo.description}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">{storeInfo.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">{storeInfo.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{storeInfo.hours}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{storeInfo.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              <span>{storeInfo.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="mt-8 px-4">
        <h2 className="flex items-center text-xl font-bold mb-4">
          <Gift className="w-6 h-6 mr-2 text-blue-600" />
          Available Rewards
        </h2>
        <div className="grid gap-4">
          {storeInfo.availableRewards.map((reward) => (
            <div 
              key={reward.id} 
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-500">{reward.points} points</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCreateCard(reward.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 px-4 pb-20">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {storeInfo.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img 
                    src={review.avatar} 
                    alt={review.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{review.user}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-gray-600">{review.comment}</p>
              {review.images.length > 0 && (
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Review ${index + 1}`}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreHome;