export interface Item {
    id: string;
    name: string;
    imgUrl: string;
    email: string;
  }
  
  export const dummyData: Item[] = [
    { id: '1', name: 'Aarav Kumar', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=AaravKumar', email: 'aarav.kumar@gmail.com' },
  { id: '2', name: 'Ananya Singh', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=AnanyaSingh', email: 'ananya.singh@gmail.com' },
  { id: '3', name: 'Vivaan Gupta', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=VivaanGupta', email: 'vivaan.gupta@gmail.com' },
  { id: '4', name: 'Isha Patel', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=IshaPatel', email: 'isha.patel@gmail.com' },
  { id: '5', name: 'Arjun Reddy', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ArjunReddy', email: 'arjun.reddy@gmail.com' },
  { id: '6', name: 'Manish Singh', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=SaanviSharma', email: 'manishhsingh928@gmail.com' },
  { id: '7', name: 'Rohan Mehra', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=RohanMehra', email: 'rohan.mehra@gmail.com' },
  { id: '8', name: 'Zara Khan', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ZaraKhan', email: 'zara.khan@gmail.com' },
  { id: '9', name: 'Ayaan Ali', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=AyaanAli', email: 'ayaan.ali@gmail.com' },
  { id: '10', name: 'Pari Joshi', imgUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=PariJoshi', email: 'pari.joshi@gmail.com' }
  ];
  
  
  
  const getRandomAvatarUrl = () => {
  const randomIndex = Math.floor(Math.random() * dummyData.length);
  return dummyData[randomIndex];
  };

