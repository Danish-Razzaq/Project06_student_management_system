interface Course {
    name: string;
    code: string;
}

interface Student {
    name: string;
    id: string;
    courses: Course[];
    balance: number;
}

class StudentRegistry {
    students: Student[];

    constructor() {
        this.students = [];
    }

    enroll(name: string, courses: Course[]) {
        const id = this.generateID();
        const student: Student = { name, id, courses, balance: 0 };
        this.students.push(student);
    }

    protected generateID(): string {             //randomm id generated using some math func
        const idLength = 5;
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }
        return id;
    }

    viewBalance(id: string) {
        const student = this.getStudentByID(id);
        console.log(`${student.name}'s balance is $${student.balance}.`);
    }

    payTuition(id: string, amount: number) {
        const student = this.getStudentByID(id);
        student.balance -= amount;
        console.log(`${student.name} has paid $${amount} of tuition.`);
    }

    showStatus(id: string) {
        const student = this.getStudentByID(id);
        console.log(`Name: ${student.name}`);
        console.log(`ID: ${student.id}`);
        console.log(`Courses enrolled: ${student.courses.map(course => course.name).join(',')}`);
        console.log(`Balance: $${student.balance}`);
    }

    private getStudentByID(id: string): Student {

        const student = this.students.find(student => student.id === id);
        
        if (!student) {
            
            throw console.log(`Student with ID ${id} not found.`);
        }
        return student;
    }

}

const registry = new StudentRegistry();

// Enroll a new student using Enroll method
registry.enroll('John Doe', [{ name: 'Mathematics', code: 'MATH01' }, { name: 'English', code: 'ENG01' }]);
console.log();

// View student balance
registry.viewBalance('ABC12');

// Pay tuition Fee
registry.payTuition('ABCD1', 500);

// Show student status
registry.showStatus("ABCDE")