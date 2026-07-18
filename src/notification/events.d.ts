type SubscriptionEventPayload = {
    subscription: {
        user_id: number;
        subscription_plan_id: number;
        starts_at: string;
        ends_at: string;
        status: string;
        auto_renew: boolean;
        context: string;
        context_id: string;
        subscription_type: string;
        updated_at: string;
        created_at: string;
        id: number;
        plan: {
            id: number;
            service_name: string;
            name: string;
            description: string;
            code: string;
            price: string;
            billing_cycle: string;
            duration_days: number;
            created_at: string;
            updated_at: string;
        };
    };
    timestamp: number;
    meta: {
        subscription_id: number;
        transaction_id: number;
        transaction_reference: string;
        service_name: string;
        subscription_plan_name: string;
    };
};