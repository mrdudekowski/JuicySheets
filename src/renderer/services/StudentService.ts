import { Student, AddStudentFormData } from '../types/form'

export interface StudentService {
  loadStudents(): Promise<Student[]>
  saveStudents(students: Student[]): Promise<void>
  addStudent(students: Student[], formData: AddStudentFormData): Student[]
  updateStudent(students: Student[], studentId: string, formData: AddStudentFormData): Student[]
  deleteStudent(students: Student[], studentId: string): Student[]
  getStudentById(students: Student[], studentId: string): Student | undefined
  searchStudents(students: Student[], query: string): Student[]
}

// Реализация сервиса студентов
class StudentServiceImpl implements StudentService {
  private readonly STORAGE_KEY = 'juicy-sheets-students'

  async loadStudents(): Promise<Student[]> {
    try {
      // В будущем здесь будет вызов к main процессу через preload
      // const students = await window.electronAPI.getStudents()
      
      // Пока используем localStorage для демонстрации
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const parsedStudents = JSON.parse(stored)
        // Уважаем пустой массив как валидное состояние
        if (Array.isArray(parsedStudents)) {
          console.log('✅ Студенты загружены из localStorage:', parsedStudents.length)
          return parsedStudents
        }
      }

      // Если данных нет или они невалидны — вернём дефолт и сохраним
      const defaultStudents = this.getDefaultStudents()
      await this.saveStudents(defaultStudents)
      console.log('✅ Созданы студенты по умолчанию:', defaultStudents.length)
      return defaultStudents
    } catch (error) {
      console.error('Ошибка загрузки студентов:', error)
      // В случае ошибки возвращаем студентов по умолчанию
      const defaultStudents = this.getDefaultStudents()
      console.log('⚠️ Ошибка загрузки, возвращаем студентов по умолчанию:', defaultStudents.length)
      return defaultStudents
    }
  }

  async saveStudents(students: Student[]): Promise<void> {
    try {
      // В будущем здесь будет вызов к main процессу через preload
      // await window.electronAPI.saveStudents(students)
      
      // Проверяем, что массив студентов валидный
      if (!Array.isArray(students)) {
        console.error('❌ Попытка сохранить невалидный массив студентов:', students)
        throw new Error('Невалидный массив студентов')
      }
      
      // Пока используем localStorage для демонстрации
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students))
      console.log('✅ Список студентов сохранен:', students.length, 'студентов')
    } catch (error) {
      console.error('Ошибка сохранения студентов:', error)
      throw new Error('Не удалось сохранить список студентов')
    }
  }

  addStudent(students: Student[], formData: AddStudentFormData): Student[] {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      name: formData.name,
      level: formData.level,
      materials: formData.materials,
      notes: formData.notes,
      avatar: undefined,
      email: undefined,
      phone: undefined
    }

    return [...students, newStudent]
  }

  updateStudent(students: Student[], studentId: string, formData: AddStudentFormData): Student[] {
    return students.map(student => 
      student.id === studentId 
        ? {
            ...student,
            name: formData.name,
            level: formData.level,
            materials: formData.materials,
            notes: formData.notes
          }
        : student
    )
  }

  deleteStudent(students: Student[], studentId: string): Student[] {
    return students.filter(student => student.id !== studentId)
  }

  getStudentById(students: Student[], studentId: string): Student | undefined {
    return students.find(student => student.id === studentId)
  }

  searchStudents(students: Student[], query: string): Student[] {
    if (!query.trim()) {
      return students
    }

    const lowercaseQuery = query.toLowerCase()
    return students.filter(student => 
      student.name.toLowerCase().includes(lowercaseQuery) ||
      student.email?.toLowerCase().includes(lowercaseQuery) ||
      student.phone?.includes(query) ||
      student.level?.toLowerCase().includes(lowercaseQuery)
    )
  }

  private getDefaultStudents(): Student[] {
    return [
      {
        id: '1',
        name: 'Иван Петров',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        level: 'intermediate',
        materials: 'Учебник "English Grammar in Use"',
        notes: 'Хорошо усваивает грамматику'
      },
      {
        id: '2',
        name: 'Мария Сидорова',
        email: 'maria@example.com',
        phone: '+7 (999) 234-56-78',
        level: 'beginner',
        materials: 'Учебник "Headway Beginner"',
        notes: 'Начинающий уровень'
      },
      {
        id: '3',
        name: 'Алексей Козлов',
        email: 'alex@example.com',
        phone: '+7 (999) 345-67-89',
        level: 'advanced',
        materials: 'Учебник "Advanced Grammar"',
        notes: 'Продвинутый уровень, готовится к экзаменам'
      }
    ]
  }
}

// Экспортируем экземпляр сервиса
export const studentService = new StudentServiceImpl()
