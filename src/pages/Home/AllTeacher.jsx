import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaChalkboardTeacher, FaGraduationCap, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const AllTeacher = () => {
    const axiosSecure = useAxiosSecure();
    
    // Fetch all teachers
    const { data: teachers = [], isLoading, isError } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // Filter users with role 'teacher'
            return res.data.filter(user => user.role === 'teacher');
        }
    });

    if (isLoading) {
        return <div className="text-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Loading teachers...</p>
        </div>;
    }

    if (isError) {
        return <div className="alert alert-error max-w-md mx-auto mt-8">
            Failed to load teachers. Please try again later.
        </div>;
    }

    if (teachers.length === 0) {
        return <div className="text-center py-8">
            <p className="text-xl">No teachers found.</p>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Our Teaching Staff</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map(teacher => (
                    <div key={teacher._id} className="flip-card">
                        <div className="flip-card-inner">
                            {/* Front of the card */}
                            <div className="flip-card-front bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full">
                                {teacher.image ? (
                                    <img 
                                        src={teacher.image} 
                                        alt={teacher.name} 
                                        className="w-32 h-32 rounded-full object-cover border-4 border-primary mb-4"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                                        <FaChalkboardTeacher className="text-4xl text-gray-500" />
                                    </div>
                                )}
                                <h3 className="text-xl font-bold">{teacher.name}</h3>
                                <p className="text-primary font-medium">{teacher.subject}</p>
                                <p className="text-gray-600 mt-2">{teacher.educationQualification}</p>
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Hover to see details</p>
                                </div>
                            </div>
                            
                            {/* Back of the card */}
                            <div className="flip-card-back bg-primary text-white rounded-lg shadow-md p-6 flex flex-col justify-center h-full">
                                <h3 className="text-xl font-bold mb-4">{teacher.name}</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <FaChalkboardTeacher className="mt-1 mr-3" />
                                        <div>
                                            <p className="font-semibold">Subject</p>
                                            <p>{teacher.subject || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <FaGraduationCap className="mt-1 mr-3" />
                                        <div>
                                            <p className="font-semibold">Qualification</p>
                                            <p>{teacher.educationQualification || 'Not specified'}</p>
                                        </div>
                                    </div>
                                    
                                    {teacher.phoneNumber && (
                                        <div className="flex items-start">
                                            <FaPhone className="mt-1 mr-3" />
                                            <div>
                                                <p className="font-semibold">Phone</p>
                                                <p>{teacher.phoneNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {teacher.email && (
                                        <div className="flex items-start">
                                            <FaEnvelope className="mt-1 mr-3" />
                                            <div>
                                                <p className="font-semibold">Email</p>
                                                <p>{teacher.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {teacher.address && (
                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="mt-1 mr-3" />
                                            <div>
                                                <p className="font-semibold">Address</p>
                                                <p>{teacher.address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTeacher;