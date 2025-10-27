import React from 'react';
import { Heart, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-pink-600 to-amber-500 bg-clip-text text-transparent">
              About SareeSansaar
            </h1>
            <p className="text-gray-600 text-lg">
              Preserving tradition, celebrating elegance
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to SareeSansaar, where tradition meets elegance. We are passionate about bringing you the finest collection of authentic Indian sarees, handcrafted by skilled artisans from across India.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our journey began with a simple vision: to preserve the rich heritage of Indian textiles while making them accessible to modern women who appreciate timeless beauty and craftsmanship.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each saree in our collection tells a story of tradition, artistry, and dedication. We work directly with weavers and artisans to ensure fair practices and the highest quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-pink-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600 text-sm">Dedicated to preserving Indian textile heritage</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">Only the finest materials and craftsmanship</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Supporting artisans and their families</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
