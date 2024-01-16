import PickUser from '@/components/PickUsers'
import { dummyData } from '../data/dummyData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-start justify-center p-4">
    <div className="w-full max-w-xl  bg-gray-700 rounded-xl shadow-lg p-4">
      <h1 className="text-2xl font-bold  text-gray-200 mb-4">
        Pick Users
      </h1>
      <PickUser items={dummyData} />
    </div>
  </div>
  )
}
