import React from 'react'
import { assets } from '../assets/assets'

const testimonials = [
    {
        id: 1,
        name: 'Emma Rodriguez',
        location: 'Barcelona, Spain',
        text:
            "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
        image: assets.testimonial_image_1,
    },
    {
        id: 2,
        name: 'Emma Rodriguez',
        location: 'Barcelona, Spain',
        text:
            "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
        image: assets.testimonial_image_2,
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        location: 'Barcelona, Spain',
        text:
            "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
        image: assets.user_profile,
    },
]

const Testimonial = () => {
    return (
        <section className="w-full bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 text-center">
                <h2
                    className="reveal text-2xl font-bold text-slate-800 sm:text-3xl"
                    style={{ '--reveal-delay': '0s' }}
                >
                    What Our Customers Say
                </h2>
                <p
                    className="reveal mt-3 max-w-2xl text-sm text-slate-500"
                    style={{ '--reveal-delay': '0.12s' }}
                >
                    Discover why discerning travelers choose RentMe for their luxury accommodations
                    around the world.
                </p>

                <div className="mt-12 grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={testimonial.id}
                            className="testimonial-card reveal relative rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-md shadow-slate-200/60"
                            style={{ '--reveal-delay': `${0.18 + index * 0.12}s` }}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-slate-400">{testimonial.location}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-1 text-[#3B5BFC]">
                                {[...Array(5)].map((_, starIndex) => (
                                    <svg
                                        key={`${testimonial.id}-star-${starIndex}`}
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4"
                                        fill="currentColor"
                                    >
                                        <path d="M12 17.27l-5.18 3.04 1.38-5.9L3 9.24l6.05-.52L12 3l2.95 5.72L21 9.24l-5.2 5.17 1.38 5.9z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="mt-4 text-sm text-slate-500">"{testimonial.text}"</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonial
