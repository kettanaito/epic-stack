import './setup-env-vars'
import { installGlobals } from '@remix-run/node'
import matchers, {
	type TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import 'dotenv/config'
import fs from 'fs'
import { BASE_DATABASE_PATH, DATABASE_PATH } from './paths'
import { deleteAllData } from './utils'

declare global {
	namespace Vi {
		interface JestAssertion<T = any>
			extends jest.Matchers<void, T>,
				TestingLibraryMatchers<T, void> {}
	}
}

expect.extend(matchers)

installGlobals()
fs.copyFileSync(BASE_DATABASE_PATH, DATABASE_PATH)

afterEach(async () => {
	await deleteAllData()
})

afterAll(async () => {
	await fs.promises.rm(DATABASE_PATH)
})
