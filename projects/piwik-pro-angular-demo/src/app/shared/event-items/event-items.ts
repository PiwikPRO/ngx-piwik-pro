import { Injectable } from '@angular/core';

export interface EventItem {
  id: string;
  name: string;
  overview: string;
}

const EVENTS = [
  // {
  //   id: 'page-views',
  //   name: 'Page views',
  //   overview: 'Page view is the most basic type of the tracked event. It represents a single page viewing action.'
  // },
  {
    id: 'user-management',
    name: 'User Management',
    overview: 'User ID is an additional parameter that allows you to aggregate data.'
  },
  {
    id: 'custom-events',
    name: 'Custom Events',
    overview: 'Custom events enable tracking visitor actions that are not predefined in the existing JavaScript Tracking Client API.'
  },
  // {
  //   id: 'site-search',
  //   name: 'Site Search',
  //   overview: 'Site search tracking gives you insight into how visitors interact with the search engine on your website - what they search for and how many results they get back.'
  // },
  {
    id: 'e-commerce',
    name: 'E-commerce',
    overview: 'JavaScript API supports 3 types of e-commerce interactions: Category and product views, Cart updates and Orders.'
  },
  {
    id: 'content-tracking',
    name: 'Content tracking',
    overview: 'Let’s talk about a scenario in which simple page view tracking is not enough.'
  },
  {
    id: 'downloads-and-outlinks',
    name: 'Downloads and Outlinks',
    overview: 'Download and outlinks are links on your site that point to content that normally can’t be tracked (e.g. non-HTML files - downloads or pages outside your domain - outlinks).'
  },
  // {
  //   id: 'goal-tracking',
  //   name: 'Goal Tracking',
  //   overview: 'At this point we have tracked many different types of events.'
  // },
  // {
  //   id: 'creating-a-custom-stepper-using-the-cdk-stepper',
  //   name: 'Anonymous tracking',
  //   overview: 'You can set JavaScript Tracking Client to mark requests to be anonymized.'
  // },
];

@Injectable()
export class EventItems {

  getAllItems(): EventItem[] {
    return EVENTS;
  }

  getItemById(id: string): EventItem | undefined {
    return EVENTS.find(i => i.id === id);
  }
}
