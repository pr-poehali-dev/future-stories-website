import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadStep, setUploadStep] = useState('');

  const [videoData, setVideoData] = useState([
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
      description: 'Невероятная прогулка по городу будущего, созданная нейросетью',
      tags: ['киберпанк', 'город', 'будущее', 'архитектура'],
      aiModel: 'DALL-E 3',
      category: 'Фантастика'
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
      description: 'Как выглядит интерфейс создания AI-видео изнутри',
      tags: ['интерфейс', 'технологии', 'AI', 'дизайн'],
      aiModel: 'Midjourney',
      category: 'Технологии'
    },
    {
      id: 3,
      thumbnail: '/img/d76e3c68-e441-48d4-9c91-c2a931c2faf4.jpg',
      title: 'Космические пейзажи',
      creator: 'SpaceArt',
      avatar: 'SA',
      likes: 23000,
      views: 120000,
      duration: '2:15',
      isPremium: false,
      description: 'Фантастические космические виды, сгенерированные ИИ',
      tags: ['космос', 'пейзаж', 'звезды', 'планеты'],
      aiModel: 'Stable Diffusion',
      category: 'Природа'
    },
    {
      id: 4,
      thumbnail: '/img/af3c8cc0-8865-47b2-aa9f-2f876cb9dda7.jpg',
      title: 'Нейронные сети',
      creator: 'BrainTech',
      avatar: 'BT',
      likes: 15600,
      views: 78000,
      duration: '1:45',
      isPremium: true,
      description: 'Визуализация работы искусственного интеллекта',
      tags: ['AI', 'нейросети', 'мозг', 'технологии'],
      aiModel: 'DALL-E 3',
      category: 'Наука'
    }
  ]);

  // User profile data
  const [userProfile] = useState({
    username: 'AICreator2024',
    displayName: 'Творец Будущего',
    bio: 'Создаю невероятные миры с помощью ИИ 🚀',
    followers: 15420,
    following: 892,
    videos: 47,
    likes: 234500,
    avatar: 'AC',
    joinDate: 'Март 2024',
    isVerified: false
  });

  // AI recommendations system
  useEffect(() => {
    const generateRecommendations = () => {
      const currentVideo = videoData[currentVideoIndex];
      if (!currentVideo) return;

      const recommended = videoData
        .filter(video => video.id !== currentVideo.id)
        .map(video => {
          let score = 0;
          
          // Same category bonus
          if (video.category === currentVideo.category) score += 30;
          
          // Common tags bonus
          const commonTags = video.tags.filter(tag => currentVideo.tags.includes(tag));
          score += commonTags.length * 15;
          
          // Same AI model bonus
          if (video.aiModel === currentVideo.aiModel) score += 20;
          
          // Popular content bonus
          if (video.likes > 20000) score += 10;
          if (video.views > 100000) score += 10;
          
          // Premium content preference for premium users
          if (isPremium && video.isPremium) score += 25;
          
          return { ...video, recommendationScore: score };
        })
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 3);

      setRecommendations(recommended);
    };

    generateRecommendations();
  }, [currentVideoIndex, videoData, isPremium]);

  const handleVideoUpload = async (formData) => {
    setIsGenerating(true);
    setUploadProgress(0);
    
    // Simulate AI video generation process
    const steps = [
      { progress: 20, message: 'Анализ промпта...' },
      { progress: 40, message: 'Генерация кадров...' },
      { progress: 60, message: 'Создание анимации...' },
      { progress: 80, message: 'Постобработка...' },
      { progress: 100, message: 'Готово!' }
    ];
    
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadProgress(step.progress);
      setUploadStep(step.message);
    }
    
    // Add new video to feed
    const newVideo = {
      id: videoData.length + 1,
      thumbnail: '/img/0497b10b-95d5-41c6-af3d-972e6eb9e529.jpg',
      title: formData.title,
      creator: 'Вы',
      avatar: 'YOU',
      likes: 0,
      views: 0,
      duration: '1:00',
      isPremium: formData.isPremium === 'on',
      description: formData.description,
      tags: formData.tags?.split(',').map(tag => tag.trim()) || [],
      aiModel: formData.aiModel,
      category: formData.category
    };
    
    setVideoData(prev => [newVideo, ...prev]);
    setIsGenerating(false);
    setShowUpload(false);
    setUploadProgress(0);
    setUploadStep('');
  };

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
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/80 hover:text-white"
                onClick={() => setShowUpload(true)}
              >
                <Icon name="Upload" size={20} />
              </Button>
              <Button 
                onClick={() => setIsPremium(!isPremium)}
                className={`${isPremium ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'} hover:from-purple-700 hover:to-pink-700`}
              >
                {isPremium ? 'Premium' : 'Upgrade'}
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setShowProfile(true)}>
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
            <div key={video.id} className="h-screen snap-start relative" onScroll={() => setCurrentVideoIndex(index)}>
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

                {/* AI Model badge */}
                <Badge className="absolute top-16 left-4 bg-purple-500/80 text-white border-none">
                  <Icon name="Cpu" size={12} className="mr-1" />
                  {video.aiModel}
                </Badge>
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
                    <p className="text-white/80 text-sm line-clamp-2 mb-2">{video.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {video.tags?.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-white/20 text-white border-none">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* AI Recommendations */}
                    {index === currentVideoIndex && recommendations.length > 0 && (
                      <div className="mt-2">
                        <p className="text-white/70 text-xs mb-1">🤖 Рекомендации ИИ:</p>
                        <div className="flex space-x-2">
                          {recommendations.slice(0, 2).map((rec, i) => (
                            <div key={i} className="flex items-center space-x-1 bg-white/10 rounded-lg px-2 py-1">
                              <div className="w-8 h-8 rounded bg-gray-600 flex-shrink-0"></div>
                              <div>
                                <p className="text-white text-xs font-medium truncate w-20">{rec.title}</p>
                                <p className="text-white/60 text-xs">{rec.creator}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400" onClick={() => setShowUpload(true)}>
                <Icon name="Plus" size={24} />
                <span className="text-xs">Создать</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400">
                <Icon name="Bell" size={24} />
                <span className="text-xs">Уведомления</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-white/60 hover:text-purple-400" onClick={() => setShowProfile(true)}>
                <Icon name="User" size={24} />
                <span className="text-xs">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white dark:bg-gray-900 w-full max-w-md animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Создать AI-видео</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {isGenerating ? (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                      <Icon name="Cpu" size={24} className="text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Генерация видео...</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{uploadStep}</p>
                  <Progress value={uploadProgress} className="mb-2" />
                  <p className="text-sm text-gray-500">{uploadProgress}%</p>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = Object.fromEntries(formData.entries());
                  handleVideoUpload(data);
                }}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название видео</Label>
                      <Input name="title" placeholder="Введите название..." required />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea name="description" placeholder="Опишите ваше видео..." rows={3} />
                    </div>

                    <div>
                      <Label htmlFor="prompt">AI Промпт</Label>
                      <Textarea name="prompt" placeholder="Опишите что должно быть в видео..." rows={3} required />
                    </div>

                    <div>
                      <Label htmlFor="aiModel">AI Модель</Label>
                      <Select name="aiModel">
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DALL-E 3">DALL-E 3</SelectItem>
                          <SelectItem value="Midjourney">Midjourney</SelectItem>
                          <SelectItem value="Stable Diffusion">Stable Diffusion</SelectItem>
                          <SelectItem value="Runway ML">Runway ML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select name="category">
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Фантастика">Фантастика</SelectItem>
                          <SelectItem value="Технологии">Технологии</SelectItem>
                          <SelectItem value="Природа">Природа</SelectItem>
                          <SelectItem value="Наука">Наука</SelectItem>
                          <SelectItem value="Искусство">Искусство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Теги (через запятую)</Label>
                      <Input name="tags" placeholder="тег1, тег2, тег3..." />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch name="isPremium" />
                      <Label>Премиум контент</Label>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowUpload(false)} className="flex-1">
                        Отмена
                      </Button>
                      <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Icon name="Sparkles" size={16} className="mr-2" />
                        Создать
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md mx-auto rounded-t-3xl animate-slide-up">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Профиль</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
                        {userProfile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-xl font-semibold">{userProfile.displayName}</h4>
                    <p className="text-gray-600 dark:text-gray-400">@{userProfile.username}</p>
                    <p className="text-sm text-gray-500 mt-2">{userProfile.bio}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-lg font-semibold">{userProfile.videos}</p>
                      <p className="text-xs text-gray-500">Видео</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{userProfile.followers.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Подписчики</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{userProfile.following.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Подписки</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Общие лайки</span>
                      <span className="font-medium">{userProfile.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Дата регистрации</span>
                      <span className="font-medium">{userProfile.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Статус</span>
                      <Badge className={isPremium ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black' : 'bg-gray-500'}>
                        {isPremium ? 'Premium' : 'Базовый'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать профиль
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Share" size={16} className="mr-2" />
                      Поделиться профилем
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Уведомления</p>
                        <p className="text-sm text-gray-500">Получать push-уведомления</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Приватный профиль</p>
                        <p className="text-sm text-gray-500">Только подписчики видят контент</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">AI рекомендации</p>
                        <p className="text-sm text-gray-500">Персонализированный контент</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Автозагрузка видео</p>
                        <p className="text-sm text-gray-500">Экономия трафика</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Помощь и поддержка
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Конфиденциальность
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти из аккаунта
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

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