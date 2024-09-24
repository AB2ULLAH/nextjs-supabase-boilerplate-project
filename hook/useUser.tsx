"use client";
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useQuery } from '@tanstack/react-query';

const initUser = {
    created_at: null,
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    subscription: {
        created_at: "",
        customer_id: "",
        email: "",
        end_at: "",
        subscription_id: "",
    }
};

export default function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const supabase = supabaseBrowser();
            const { data } = await supabase.auth.getSession();
            if (data.session?.user) {
                // Fetch user information profile
                const { data: user, error } = await supabase
                    .from('profiles')
                    .select("*, subscription(*)")
                    .eq('id', data.session.user.id)
                    .single();

                if (error) {
                    console.error("Error fetching user:", error);
                    // If there's an error and it's not because the user doesn't exist
                    if (error.code !== 'PGRST116') { // Adjust based on your error code for no rows
                        return initUser;
                    }
                }

                // If user is not found, return initUser
                if (!user) {
                    return initUser;
                }

                return user;
            }
            return initUser;
        },
    });
}
