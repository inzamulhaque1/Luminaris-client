import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaAward,
  FaBook,
  FaUserTie
} from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';

const AllTeacher = () => {
  const axiosPublic = useAxiosPublic();

  const { data: teachers = [], isLoading, isError } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users');
      return res.data.filter(user => user.role === 'teacher');
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading teachers...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        Failed to load teachers. Please try again later.
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">No teachers found.</p>
      </div>
    );
  }

  return (
<div className="container mx-auto px-4 py-8">
  {/* Enhanced Header Section with Red Theme */}
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-4 text-red-700">
      Meet Our <span className="text-red-600">Exceptional</span> Faculty
    </h1>
    <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
      Our dedicated team of <span className="font-semibold text-red-600">professional educators</span> brings years of experience and passion to the classroom
    </p>
    
    {/* Stats Bar - Optional */}
    <div className="flex justify-center gap-8 mt-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-red-700">50+</div>
        <div className="text-gray-600">Certified Teachers</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-red-700">100%</div>
        <div className="text-gray-600">Qualified Staff</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-red-700">15+</div>
        <div className="text-gray-600">Years Experience</div>
      </div>
    </div>
  </div>

  {/* Teacher Cards Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Teacher cards go here */}
        {teachers.map(teacher => (
          <div
            key={teacher._id}
            className="flip-card"
            style={{
              perspective: '1000px',
              height: '450px',
              width: '300px',
              margin: '0 auto',
            }}
          >
            <div
              className="flip-card-inner"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.8s ease-in-out',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Enhanced Front Side with Red Theme */}
              <div
                className="flip-card-front"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #fff5f5 0%, #fee2e2 100%)',
                  border: '2px solid #fecaca',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Corner Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #dc2626, #ef4444)',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)',
                    zIndex: 10,
                  }}
                />

                {/* Profile Image */}
                <div className="w-full flex justify-center">
                  <div className="relative">
                    {teacher.image ? (
                      <img 
                        src={teacher.image}
                        alt={teacher.name}
                        style={{
                          width: '140px',
                          height: '140px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '4px solid #dc2626',
                          boxShadow: '0 6px 12px rgba(220, 38, 38, 0.3)',
                          transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: '140px',
                          height: '140px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '4px solid #dc2626',
                          transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-110"
                      >
                        <GiTeacher style={{ fontSize: '3rem', color: '#dc2626' }} />
                      </div>
                    )}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-red-200">
                      <FaUserTie className="text-red-600" />
                    </div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="w-full mt-4">
                  <h3 style={{ 
                    fontSize: '1.35rem', 
                    fontWeight: 'bold', 
                    color: '#7f1d1d',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    {teacher.name}
                  </h3>
                  <div
                    style={{
                      background: 'linear-gradient(90deg, #dc2626, #ef4444)',
                      color: 'white',
                      padding: '0.25rem 1rem',
                      borderRadius: '999px',
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      fontWeight: '600',
                      boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)'
                    }}
                  >
                    {teacher.subject || 'Expert Educator'}
                  </div>
                </div>

                {/* Stats */}
                <div className="w-full mt-2">
                  <div className="flex items-center justify-center space-x-4 my-3">
                    <div className="flex items-center">
                      <FaBook className="text-red-400 mr-1" />
                      <span className="text-sm text-red-800">
                        {teacher.courses?.length || 5}+ Courses
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaAward className="text-red-500 mr-1" />
                      <span className="text-sm text-red-800">
                        {teacher.experience || '5+'} Years
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-red-100 rounded-lg p-2 mt-2 border border-red-200">
                    <p className="text-sm text-red-700 font-medium">
                      {teacher.educationQualification || 'Advanced Degree'}
                    </p>
                  </div>
                </div>

                {/* Hover Prompt */}
                <div
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    color: '#b91c1c',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  className="group-hover:bg-red-600 group-hover:text-white"
                >
                  <span>Flip Me!</span>
                  <FaChalkboardTeacher style={{ fontSize: '1rem' }} />
                </div>

                {/* Subtle Background Pattern */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.05) 10%, transparent 10%)',
                    backgroundSize: '20px 20px',
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Back Side - Red Theme */}
              <div
                className="flip-card-back"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {teacher.name}
                </h3>
                <div style={{ spaceY: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <FaChalkboardTeacher style={{ marginTop: '0.25rem', marginRight: '0.75rem', color: '#fca5a5' }} />
                    <div>
                      <p style={{ fontWeight: '600', color: '#fee2e2' }}>Subject</p>
                      <p>{teacher.subject || 'Not specified'}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <FaGraduationCap style={{ marginTop: '0.25rem', marginRight: '0.75rem', color: '#fca5a5' }} />
                    <div>
                      <p style={{ fontWeight: '600', color: '#fee2e2' }}>Qualification</p>
                      <p>{teacher.educationQualification || 'Not specified'}</p>
                    </div>
                  </div>
                  {teacher.phoneNumber && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <FaPhone style={{ marginTop: '0.25rem', marginRight: '0.75rem', color: '#fca5a5' }} />
                      <div>
                        <p style={{ fontWeight: '600', color: '#fee2e2' }}>Phone</p>
                        <p>{teacher.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                  {teacher.email && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <FaEnvelope style={{ marginTop: '0.25rem', marginRight: '0.75rem', color: '#fca5a5' }} />
                      <div>
                        <p style={{ fontWeight: '600', color: '#fee2e2' }}>Email</p>
                        <p>{teacher.email}</p>
                      </div>
                    </div>
                  )}
                  {teacher.address && (
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <FaMapMarkerAlt style={{ marginTop: '0.25rem', marginRight: '0.75rem', color: '#fca5a5' }} />
                      <div>
                        <p style={{ fontWeight: '600', color: '#fee2e2' }}>Address</p>
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