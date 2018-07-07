import { boostrap } from 'lambda';
import { StoryService } from './api/story/story.service';


export = boostrap(StoryService, '');