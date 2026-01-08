import { useEffect, useState } from 'react'
import { fetchEnrollments } from '../api/enrollments'
import type { Enrollment, EnrollmentStatus } from '../types/enrollment'

type StatusFilter = EnrollmentStatus | 'all'

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([])
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Fetch inicial de enrollments
  useEffect(() => {
    setLoading(true)
    fetchEnrollments()
      .then((data) => setEnrollments(data))
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  // Filtrado combinado: status + búsqueda por texto
  useEffect(() => {
    let result = enrollments

    // Filtrar por status
    if (statusFilter !== 'all') {
      result = result.filter((e) => e.status === statusFilter)
    }

    // Filtrar por texto (nombre o email)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((e) =>
        e.student_name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query)
      )
    }

    setFilteredEnrollments(result)
  }, [statusFilter, searchQuery, enrollments])

  const addEnrollment = (enrollment: Enrollment) => {
    setEnrollments([...enrollments, enrollment])
  }

  const confirmEnrollment = (id: string) => {
    setEnrollments(enrollments.map((e) =>
      e.id === id ? { ...e, status: 'confirmed' } : e
    ))
  }

  return {
    enrollments,
    filteredEnrollments,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    addEnrollment,
    confirmEnrollment,
  }
}
