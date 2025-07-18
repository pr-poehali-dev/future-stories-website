import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const videoData = [
    {
      id: 1,
      thumbnail: '/img/0497b10b-95d5-41c6-af3d-972e6eb9e529.jpg',
      title: 'Кибер-город будущего',
      creator: 'AIVisionary',
      avatar: 'AV',
      likes: 12500,
      views: 85000,
      duration: '0:45',
      isPremium: false,
      description: 'Невероятная прогулка по городу будущего, созданная нейросетью'
    },
    {
      id: 2,
      thumbnail: '/img/ce01bd08-03e8-4561-9aab-67968568e0ee.jpg',
      title: 'Нейро-интерфейс',
      creator: 'TechMaster',
      avatar: 'TM',
      likes: 8900,
      views: 45000,
      duration: '1:20',
      isPremium: true,
      description: 'Как выглядит интерфейс создания AI-видео изнутри'
    },
    {
      id: 3,
      thumbnail: '/img/0497b10b-95d5-41c6-af3d-972e6eb9e529.jpg',
      title: 'Космические пейзажи',
      creator: 'SpaceArt',
      avatar: 'SA',
      likes: 23000,
      views: 120000,
      duration: '2:15',
      isPremium: false,
      description: 'Фантастические космические виды, сгенерированные ИИ'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Future Stories
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Icon name="Upload" size={20} />
              </Button>
              <Button 
                onClick={() => setIsPremium(!isPremium)}
                className={`${isPremium ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'} hover:from-purple-700 hover:to-pink-700`}
              >
                {isPremium ? 'Premium' : 'Upgrade'}
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-purple-600 text-white">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile-first video feed */}
      <div className="pt-16">
        <div className="max-w-md mx-auto">
          {videoData.map((video, index) => (
            <div key={video.id} className="h-screen snap-start relative">
              {video.isPremium && !isPremium && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center p-6 mx-4">
                    <Icon name="Lock" size={48} className="mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white mb-2">Премиум контент</h3>
                    <p className="text-white/80 mb-4">Для просмотра этого видео нужна подписка</p>
                    <Button 
                      onClick={() => setIsPremium(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Получить Premium
                    </Button>
                  </Card>
                </div>
              )}

              {/* Video Container */}
              <div className="relative h-full bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 rounded-full h-16 w-16"
                  >
                    <Icon name="Play" size={24} className="text-white ml-1" />
                  </Button>
                </div>

                {/* Duration badge */}
                <Badge className="absolute top-4 right-4 bg-black/50 text-white border-none">
                  {video.duration}
                </Badge>

                {/* Premium badge */}
                {video.isPremium && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-none">
                    <Icon name="Crown" size={12} className="mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <div className="flex items-end justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-10 w-10 ring-2 ring-white/30">
                        <AvatarFallback className="bg-purple-600 text-white text-sm">
                          {video.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{video.creator}</p>
                        <div className="flex items-center space-x-2 text-white/70 text-sm">
                          <span>{video.views.toLocaleString()} просм.</span>
                          <span>•</span>
                          <span>{video.likes.toLocaleString()} лайков</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={isFollowed ? "secondary" : "default"}
                        onClick={() => setIsFollowed(!isFollowed)}
                        className={isFollowed ? "" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"}
                      >
                        {isFollowed ? 'Подписан' : 'Подписаться'}
                      </Button>
                    </div>
                    
                    <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{video.description}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col space-y-4">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="flex flex-col items-center space-y-1 transition-transform hover:scale-110"
                    >
                      <div className={`p-3 rounded-full ${isLiked ? 'bg-red-500' : 'bg-white/20'} backdrop-blur-sm`}>
                        <Icon name="Heart" size={24} className={isLiked ? 'text-white fill-current' : 'text-white'} />
                      </div>
                      <span className="text-white text-xs">{(video.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                    </button>

                    <button 
                      onClick={() => setShowComments(!showComments)}
                      className="flex flex-col items-center space-y-1 transition-transform hover:scale-110"
                    >
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon name="MessageCircle" size={24} className="text-white" />
                      </div>
                      <span className="text-white text-xs">128</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1 transition-transform hover:scale-110">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon name="Share" size={24} className="text-white" />
                      </div>
                      <span className="text-white text-xs">Поделиться</span>
                    </button>

                    <button className="flex flex-col items-center space-y-1 transition-transform hover:scale-110">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                        <Icon name="Bookmark" size={24} className="text-white" />
                      </div>
                      <span className="text-white text-xs">Сохранить</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around py-2">
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white hover:text-purple-400">
                <Icon name="Home" size={24} />
                <span className="text-xs">Главная</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400">
                <Icon name="Search" size={24} />
                <span className="text-xs">Поиск</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400">
                <Icon name="Plus" size={24} />
                <span className="text-xs">Создать</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400">
                <Icon name="Bell" size={24} />
                <span className="text-xs">Уведомления</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400">
                <Icon name="User" size={24} />
                <span className="text-xs">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md mx-auto rounded-t-3xl animate-slide-up">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Комментарии</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">NN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">NeuralNinja</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Невероятная работа! ИИ действительно развивается стремительно 🔥</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>2ч</span>
                    <button className="hover:text-purple-500">Ответить</button>
                    <button className="hover:text-red-500">❤️ 24</button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-500 text-white text-xs">AF</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">ArtFuturist</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Какие инструменты использовались для создания?</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>1ч</span>
                    <button className="hover:text-purple-500">Ответить</button>
                    <button className="hover:text-red-500">❤️ 12</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Добавить комментарий..."
                  className="flex-1 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button size="sm" className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;