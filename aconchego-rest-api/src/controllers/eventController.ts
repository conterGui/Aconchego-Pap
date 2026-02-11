import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';

// Serializa qualquer evento transformando _id em string
const serializeEvent = (event: IEvent & { _id: unknown }) => ({
  ...event.toObject(),
  _id: String(event._id),
});

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    const serializedEvents = events.map((event) => serializeEvent(event));
    res.json(serializedEvents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(serializeEvent(event));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(serializeEvent(event));
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(serializeEvent(event));
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
