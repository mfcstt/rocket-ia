import {Stack} from '../entities/stack'

export interface StackRepository {
  create(data: { name: string; icon: string }): Promise<Stack>
  findById(id: string): Promise<Stack | null>
  findAll(): Promise<Stack[]>
  findByName(name: string): Promise<Stack | null>
}