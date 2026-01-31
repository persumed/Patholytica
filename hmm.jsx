import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const VideoScroller = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      title: 'Mountain Sunrise',
      description: 'Woke up to this incredible view 🌄',
      likes: 1234,
      comments: ['Amazing shot! 😍', 'Where is this?', 'Goals!']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=600&fit=crop',
      title: 'Coffee Time',
      description: 'Perfect way to start the day ☕',
      likes: 856,
      comments: ['I need this right now', 'Best part of morning!']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
      title: 'Nature Vibes',
      description: 'Sometimes you just need to disconnect 🌲',
      likes: 2341,
      comments: ['So peaceful', 'Taking me there', 'Nature therapy 💚']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=600&fit=crop',
      title: 'Beach Day',
      description: 'Living my best life 🏖️',
      likes: 3421,
      comments: ['Paradise!', 'Take me with you', 'Dream destination']
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&h=600&fit=crop',
      title: 'City Lights',
      description: 'Night walks hit different ✨',
      likes: 1876,
      comments: ['Stunning capture', 'Which city?', 'Night owl approved 🦉']
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const currentPost = posts[currentIndex];

  const handleLike = (postId) => {
    setLiked(prev => {
      const isLiked = !prev[postId];
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + (isLiked ? 1 : -1) }
          : post
      ));
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / itemHeight);
    setCurrentIndex(newIndex);
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId) => {
    if (newComment[postId]?.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment[postId]] }
          : post
      ));
      setNewComment({ ...newComment, [postId]: '' });
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-full bg-black overflow-hidden">
        <div 
          className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <div key={post.id} className="relative h-screen snap-start flex-shrink-0">
              {/* Image */}
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              
              {/* Action buttons */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-6">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex flex-col items-center gap-1 transition-transform active:scale-90"
                >
                  <Heart 
                    size={32} 
                    className={`${liked[post.id] ? 'fill-red-500 text-red-500' : 'text-white'} transition-colors`}
                  />
                  <span className="text-white text-xs font-semibold">{post.likes}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex flex-col items-center gap-1 transition-transform active:scale-90"
                >
                  <MessageCircle size={32} className="text-white" />
                  <span className="text-white text-xs font-semibold">{post.comments.length}</span>
                </button>
                
                <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
                  <Share2 size={32} className="text-white" />
                  <span className="text-white text-xs font-semibold">Share</span>
                </button>
              </div>
              
              {/* Title and description */}
              <div className="absolute bottom-4 left-4 right-20 text-white">
                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                <p className="text-sm opacity-90">{post.description}</p>
              </div>
              
              {/* Comments section */}
              {showComments[post.id] && (
                <div className="absolute inset-0 bg-black/95 flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-white text-lg font-semibold">Comments</h3>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {post.comments.map((comment, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-white text-sm font-semibold mb-1">user{idx + 1}</p>
                          <p className="text-gray-300 text-sm">{comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-700 flex gap-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
          {posts.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoScroller;
