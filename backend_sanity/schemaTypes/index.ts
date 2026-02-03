import {about} from './abouts'
import {announcements} from './announcements'
import {calendar} from './calendar'
import contact from './contact'
import departments from './departments'
import {events} from './events'
import families from './families'
import skills from './skills'
import testimonials from './testimonials'
import {heroSection} from './sections/hero'
import {aboutSection} from './sections/about'
import {servicesSection} from './sections/services'
import { eventsSection } from './sections/events'
import { resourcesSection } from './sections/resources'
import { imagesSection } from './sections/images'
import { videosSection } from './sections/videos'
import { productsSection } from './sections/products'
import { leadersSSection } from './sections/leaders'
import { activitiesSection } from './sections/activities'
import { themeSection } from './objects/texttheme'


export const schemaTypes = [
  about,
  announcements,
  contact,
  departments,
  families,
  skills,
  testimonials,
  events,
  calendar,

  // all section types
  heroSection,
  aboutSection,
  servicesSection,
  activitiesSection,
  leadersSSection,
  themeSection,
  eventsSection,
  resourcesSection,
  imagesSection,
  videosSection,
  productsSection,
]