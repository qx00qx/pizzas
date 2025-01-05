/* eslint-disable jsx-a11y/alt-text */
'use client';

import { api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React, { useEffect, useState } from 'react';
import { Container } from './container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ReactStories from 'react-insta-stories';

interface Props {
  className?: string;
}
export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await api.stories.getAll();
      setStories(data);
    }

    if (open) {
      document.body;
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}
        <Swiper
          slidesPerView={5}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <img
                onClick={() => onClickStory(story)}
                className="rounded-md cursor-pointer"
                height={250}
                width={200}
                src={story.previewImageUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 420 }}>
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={5000}
                width={420}
                height={620}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
