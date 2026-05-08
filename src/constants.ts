export type Status = 'available' | 'booking' | 'full';

export interface Schedule {
  dayRange: string;
  time: string;
  status: Status;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatarEmoji: string;
  schedules: Schedule[];
  category: 'umum' | 'syaraf' | 'dalam' | 'gigi' | 'tht' | 'kia' | 'ugd';
}

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 1,
    name: "dr. Irawan Sandjojo, Sp.N",
    specialty: "Spesialis Syaraf",
    avatarEmoji: "👨‍⚕️",
    category: 'syaraf',
    schedules: [
      { dayRange: "Senin - Sabtu", time: "07:00 - Selesai", status: "available" },
      { dayRange: "Senin - Jumat", time: "18:30 - Selesai", status: "available" }
    ]
  },
  {
    id: 2,
    name: "dr. Gendut Wisito, Sp.PD",
    specialty: "Penyakit Dalam",
    avatarEmoji: "👨‍⚕️",
    category: 'dalam',
    schedules: [
      { dayRange: "Senin - Kamis", time: "09:00 - Selesai", status: "available" },
      { dayRange: "Senin - Kamis", time: "18:00 - Selesai", status: "available" }
    ]
  },
  {
    id: 3,
    name: "dr. Raihatul Ambar",
    specialty: "Umum / BPJS",
    avatarEmoji: "👩‍⚕️",
    category: 'umum',
    schedules: [
      { dayRange: "Senin - Sabtu", time: "07:00 - 12:00", status: "available" }
    ]
  },
  {
    id: 4,
    name: "dr. Rani Waskita Kelana",
    specialty: "Umum / BPJS",
    avatarEmoji: "👩‍⚕️",
    category: 'umum',
    schedules: [
      { dayRange: "Senin - Sabtu", time: "12:00 - 16:00", status: "available" }
    ]
  },
  {
    id: 5,
    name: "dr. Wawang Wahyu Risdianto",
    specialty: "Umum / BPJS",
    avatarEmoji: "👨‍⚕️",
    category: 'umum',
    schedules: [
      { dayRange: "Senin - Sabtu", time: "16:00 - 20:00", status: "available" }
    ]
  },
  {
    id: 6,
    name: "drg. Camilatul Ummah",
    specialty: "Poli Gigi",
    avatarEmoji: "👩‍⚕️",
    category: 'gigi',
    schedules: [
      { dayRange: "Senin - Jumat", time: "13:00 - 17:00", status: "available" }
    ]
  },
  {
    id: 7,
    name: "Poli KIA",
    specialty: "Kebidanan & Kandungan",
    avatarEmoji: "🤰",
    category: 'kia',
    schedules: [
      { dayRange: "Senin - Sabtu", time: "07:00 - 20:00", status: "available" }
    ]
  },
  {
    id: 8,
    name: "UGD 24 JAM",
    specialty: "Unit Gawat Darurat",
    avatarEmoji: "🏥",
    category: 'ugd',
    schedules: [
      { dayRange: "Setiap Hari", time: "24 Jam", status: "available" }
    ]
  },
  {
    id: 9,
    name: "Poli THT",
    specialty: "Spesialis THT",
    avatarEmoji: "🦻",
    category: 'tht',
    schedules: [
      { dayRange: "Senin, Selasa, Kamis", time: "18:00 - Selesai", status: "available" },
      { dayRange: "Rabu", time: "11:00 - 13:00", status: "available" }
    ]
  }
];
