import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, getBaseUrl } from "./base_query";

const baseUrl = getBaseUrl();

export interface TEvents {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    location?: string;
    links?: string[];
}

export interface TEventsResponse {
  success: boolean;
  data: TEvents[];
}


export const createEvent = createApi({
  reducerPath: "eventsApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createEvent: builder.mutation<{ message: string }, TEvents>({
      query: (newEvent) => ({
        url: `${baseUrl}/events`,
        method: "POST",
        body: newEvent,
      }),
    }),

    getEvents: builder.query<TEvents[], void>({
      query: () => ({
        url: `${baseUrl}/events`,
      }),
    }),

    getUpcomingEvents: builder.query<TEventsResponse, void>({
      query: () => ({
        url: `${baseUrl}/events/upcoming`,
      }),
    }),

    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (eventId) => ({
        url: `${baseUrl}/events/${eventId}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
    useCreateEventMutation,
    useGetEventsQuery,
    useGetUpcomingEventsQuery,
    useDeleteEventMutation,
} = createEvent;