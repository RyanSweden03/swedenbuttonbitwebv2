import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ProductItem = {
  id: number;
  name: string;         // lo mantengo porque tu DTO lo pide
  quantity: number;
  price: number;
  description: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showClientModal = false;

  documentId = 1;
  guideNumber = '132';
  date = this.toDateInputValue(new Date());

  // Destinatario (por ahora fijo; luego lo llenas desde modal)
  destinatary = 'Ak Drilling International S.A';
  destinataryAddress = 'Calle Perseo Mz J lote 12';
  destinataryDistrict = 'Chorrillos';
  destinataryRUC = 20470234599;

  // Items
  products: ProductItem[] = [
    { id: 1, name: 'string', quantity: 4, price: 300, description: 'Reparación de broca para martillo 545 | 5 3/8' },
    { id: 2, name: 'string', quantity: 4, price: 300, description: 'Reparación de broca para martillo 545 | 5 1/2' },
    { id: 3, name: 'string', quantity: 3, price: 300, description: 'Reparación de broca para martillo 545 | 5 1/8' },
    { id: 4, name: 'string', quantity: 5, price: 300, description: 'Reparación de broca para martillo 545 | 5 1/4' },
    { id: 7, name: 'string', quantity: 1, price: 300, description: 'Reparación de broca para martillo 545 | 5' },
    { id: 8, name: 'string', quantity: 1, price: 350, description: 'Reparación de broca para martillo 660 | 5 5/8' },
    { id: 5, name: 'string', quantity: 1, price: 500, description: 'Reparación de broca para martillo SD-8 | 7 7/8' }
  ];

  // --- Modal handlers ---
  openClientModal(): void {
    this.showClientModal = true;
  }
  closeClientModal(): void {
    this.showClientModal = false;
  }

  // --- Items handlers ---
  addItem(): void {
    const nextId = this.getNextId();
    // add it to the top
    this.products.unshift({
      id: nextId,
      name: 'string',
      quantity: 1,
      price: 0,
      description: ''
    })

    //
    // this.products.push({
    //   id: nextId,
    //   name: 'string',
    //   quantity: 1,
    //   price: 0,
    //   description: ''
    // });
  }

  removeItem(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  incrementQty(item: ProductItem): void {
    item.quantity = Math.max(1, (Number(item.quantity) || 1) + 1);
  }

  decrementQty(item: ProductItem): void {
    item.quantity = Math.max(1, (Number(item.quantity) || 1) - 1);
  }

  lineTotal(item: ProductItem): number {
    const q = Number(item.quantity) || 0;
    const p = Number(item.price) || 0;
    return q * p;
  }

  subtotal(): number {
    return this.products.reduce((sum, p) => sum + this.lineTotal(p), 0);
  }

  igvRate = 0.18;
  igv(): number {
    return this.subtotal() * this.igvRate;
  }

  total(): number {
    return this.subtotal() + this.igv();
  }

  // --- JSON generator (tal como lo pides) ---
  buildDto(): any {
    // order products by id ascending
    this.products.sort((a, b) => a.id - b.id);


    return {
      id: this.documentId,
      date: new Date(this.date).toISOString(),
      destinatary: this.destinatary,
      destinataryAddress: this.destinataryAddress,
      destinataryDistrict: this.destinataryDistrict,
      destinataryRUC: this.destinataryRUC,
      guideNumber: this.guideNumber,
      products: this.products.map(p => ({
        id: p.id,
        name: p.name ?? 'string',
        quantity: Number(p.quantity) || 0,
        price: Number(p.price) || 0,
        description: p.description ?? ''
      }))
    };
  }

  dtoJson(): string {


    return JSON.stringify(this.buildDto(), null, 2);
  }

  // --- helpers ---
  private getNextId(): number {
    const maxId = this.products.length ? Math.max(...this.products.map(p => p.id)) : 0;
    return maxId + 1;
  }

  private toDateInputValue(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  generatePayrollGuide() {

  }
}
