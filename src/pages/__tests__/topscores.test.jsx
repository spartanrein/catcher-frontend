import React from 'react'
import {HttpResponse, http} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TopScores from '../TopScores'
import { Provider } from 'react-redux';
import { store } from '../../stores/store';

const server = setupServer(
  http.get('http://localhost:5000/scores', () => {
    return HttpResponse.json([{playerName: "Reiner", score: 1}])
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays scores', async () => {
  render(
    <Provider store={store}>
      <TopScores/>
    </Provider>
  )
  await screen.findAllByText('Rank')
  expect(screen.getByLabelText('Catcher Top Scores')).toBeInTheDocument()
})
