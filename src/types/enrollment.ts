export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Enrollment {
  id: string
  student_name: string
  email: string
  workshop: string
  status: EnrollmentStatus
  created_at: Date
}
