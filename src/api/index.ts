import axios from 'axios'

export async function getRandomName() {
  try {
    const response = await axios.get<{ FirstName: string }>(
      'https://api.randomdatatools.ru/?count=1&params=FirstName'
    )
    return response.data.FirstName
  } catch (error) {
    console.log(error)
    return 'Ошибка'
  }
}
