import React, { useState } from "react";

interface CheckoutFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Name is required";

        // Bug 1: Incorrect Regex - rejects valid emails, accepts some invalid strings
        // const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-z]{2,3}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.address) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
            setFormData({ name: "", email: "", address: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Checkout</h3>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="actions">
                <button type="submit">Place Order</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};
