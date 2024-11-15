import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Tag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const product = {
    id: 'karmenaadjie-padstal',
    name: "Karmenaadjie Padstal",
    description: "Traditional South African farm stall offering local produce, fresh baked goods, and authentic treats.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400",
    location: "123 Farm Road, Stellenbosch",
    hours: "Mon-Sun: 8AM-6PM",
    discount: "15% off all purchases",
    tags: ["Food", "Local", "Fresh Produce"]
  };

  return (
    <div className="pb-16">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover"
        />
        <Link 
          to="/"
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{product.location}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>{product.hours}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Tag className="w-5 h-5 text-gray-500" />
            <span className="text-blue-600 font-semibold">{product.discount}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 font-semibold">
          Add to My Cards
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;