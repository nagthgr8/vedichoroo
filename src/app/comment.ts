export interface Comment {
   content: string;
   created: string;
   created_by_current_user: boolean;
   fullname: string;
   id: string;
   modified: string;
   parent: string;
   profile_picture_url: string;
   upvote_count: number;
   user_has_upvoted: boolean;
   page_id: string;
   email: string;
   upvote_users: string;
}
