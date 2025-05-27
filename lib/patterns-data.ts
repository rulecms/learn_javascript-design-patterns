export interface Pattern {
  id: string;
  name: string;
  category: 'creational' | 'structural' | 'behavioral';
  description: string;
  benefits: string;
  codeExample: string;
}

export const patterns: Pattern[] = [
  // Creational Patterns
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'creational',
    description: 'Ensures a class has only one instance and provides a global point of access to it. In JavaScript, this is often implemented using closures or modules to maintain a single instance.',
    benefits: 'The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance. This is useful when exactly one object is needed to coordinate actions across the system. For example, you might use a Singleton for managing a database connection or a configuration object, ensuring that all parts of your application use the same, consistent resource.',
    codeExample: `// Singleton Pattern Example
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = this.createConnection();
    Database.instance = this;
  }
  
  createConnection() {
    return {
      host: 'localhost',
      port: 5432,
      connected: true
    };
  }
  
  query(sql) {
    console.log(\`Executing query: \${sql}\`);
    return 'Query results';
  }
}

// Usage
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true - same instance

// Alternative implementation using closure
const DatabaseSingleton = (() => {
  let instance;
  
  function createInstance() {
    return {
      connection: { host: 'localhost', port: 5432 },
      query(sql) {
        console.log(\`Executing: \${sql}\`);
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const db3 = DatabaseSingleton.getInstance();
const db4 = DatabaseSingleton.getInstance();
console.log(db3 === db4); // true`
  },
  {
    id: 'factory',
    name: 'Factory',
    category: 'creational',
    description: 'Provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.',
    benefits: 'The Factory pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. This is useful when a class can\'t anticipate the class of objects it needs to create or when it wants to delegate the responsibility of instantiation to subclasses. It promotes loose coupling by removing the need for the code to depend on concrete classes.',
    codeExample: `// Factory Pattern Example
class Vehicle {
  constructor(type, brand, model) {
    this.type = type;
    this.brand = brand;
    this.model = model;
  }
  
  getInfo() {
    return \`\${this.type}: \${this.brand} \${this.model}\`;
  }
}

class VehicleFactory {
  static createVehicle(type, brand, model) {
    switch(type) {
      case 'car':
        return new Car(brand, model);
      case 'truck':
        return new Truck(brand, model);
      case 'motorcycle':
        return new Motorcycle(brand, model);
      default:
        throw new Error(\`Unknown vehicle type: \${type}\`);
    }
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super('Car', brand, model);
    this.doors = 4;
    this.wheels = 4;
  }
  
  honk() {
    return 'Beep beep!';
  }
}

class Truck extends Vehicle {
  constructor(brand, model) {
    super('Truck', brand, model);
    this.doors = 2;
    this.wheels = 6;
    this.loadCapacity = '5000kg';
  }
  
  honk() {
    return 'HONK HONK!';
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model) {
    super('Motorcycle', brand, model);
    this.wheels = 2;
  }
  
  honk() {
    return 'Beep!';
  }
}

// Usage
const car = VehicleFactory.createVehicle('car', 'Toyota', 'Camry');
const truck = VehicleFactory.createVehicle('truck', 'Ford', 'F-150');
const motorcycle = VehicleFactory.createVehicle('motorcycle', 'Harley-Davidson', 'Sportster');

console.log(car.getInfo()); // Car: Toyota Camry
console.log(truck.honk()); // HONK HONK!
console.log(motorcycle.wheels); // 2`
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'creational',
    description: 'Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.',
    benefits: 'The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. This is particularly useful when an object needs to be created step-by-step or when the creation process must allow different representations of the object (e.g., creating different flavors of a product).',
    codeExample: `// Builder Pattern Example
class Computer {
  constructor() {
    this.parts = {};
  }
  
  addPart(name, value) {
    this.parts[name] = value;
  }
  
  getSpecs() {
    return Object.entries(this.parts)
      .map(([key, value]) => \`\${key}: \${value}\`)
      .join('\\n');
  }
}

class ComputerBuilder {
  constructor() {
    this.computer = new Computer();
  }
  
  addCPU(cpu) {
    this.computer.addPart('CPU', cpu);
    return this;
  }
  
  addRAM(ram) {
    this.computer.addPart('RAM', ram);
    return this;
  }
  
  addStorage(storage) {
    this.computer.addPart('Storage', storage);
    return this;
  }
  
  addGPU(gpu) {
    this.computer.addPart('GPU', gpu);
    return this;
  }
  
  addPowerSupply(powerSupply) {
    this.computer.addPart('Power Supply', powerSupply);
    return this;
  }
  
  build() {
    return this.computer;
  }
}

// Director class that knows how to build specific configurations
class ComputerDirector {
  static buildGamingPC(builder) {
    return builder
      .addCPU('Intel Core i9-12900K')
      .addRAM('32GB DDR5')
      .addStorage('2TB NVMe SSD')
      .addGPU('NVIDIA RTX 4090')
      .addPowerSupply('850W 80+ Gold')
      .build();
  }
  
  static buildOfficePC(builder) {
    return builder
      .addCPU('Intel Core i5-12400')
      .addRAM('16GB DDR4')
      .addStorage('512GB SSD')
      .addGPU('Integrated Graphics')
      .addPowerSupply('450W 80+ Bronze')
      .build();
  }
  
  static buildWorkstation(builder) {
    return builder
      .addCPU('AMD Threadripper PRO 5995WX')
      .addRAM('128GB ECC DDR4')
      .addStorage('4TB NVMe SSD + 10TB HDD')
      .addGPU('NVIDIA RTX A6000')
      .addPowerSupply('1200W 80+ Platinum')
      .build();
  }
}

// Usage
const gamingPC = ComputerDirector.buildGamingPC(new ComputerBuilder());
console.log('Gaming PC Specs:\\n' + gamingPC.getSpecs());

const officePC = ComputerDirector.buildOfficePC(new ComputerBuilder());
console.log('\\nOffice PC Specs:\\n' + officePC.getSpecs());

// Custom build
const customPC = new ComputerBuilder()
  .addCPU('AMD Ryzen 7 5800X')
  .addRAM('16GB DDR4')
  .addStorage('1TB SSD')
  .addGPU('AMD RX 6700 XT')
  .build();
console.log('\\nCustom PC Specs:\\n' + customPC.getSpecs());`
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'creational',
    description: 'Creates objects based on a template of an existing object through cloning. JavaScript\'s prototypal inheritance makes this pattern very natural.',
    benefits: 'The Prototype pattern is used to create new objects by copying an existing object, known as the prototype. This is useful when the cost of creating an object is more expensive or complex than copying an existing one. It leverages JavaScript\'s prototypal inheritance and allows for creating objects dynamically.',
    codeExample: `// Prototype Pattern Example
class ShapePrototype {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = '#000000';
  }
  
  clone() {
    // Create a new instance with the same prototype
    const cloned = Object.create(Object.getPrototypeOf(this));
    
    // Copy all properties
    for (let prop in this) {
      if (this.hasOwnProperty(prop)) {
        // Deep clone objects and arrays
        if (typeof this[prop] === 'object' && this[prop] !== null) {
          cloned[prop] = Array.isArray(this[prop]) 
            ? [...this[prop]] 
            : { ...this[prop] };
        } else {
          cloned[prop] = this[prop];
        }
      }
    }
    
    return cloned;
  }
  
  move(x, y) {
    this.x = x;
    this.y = y;
  }
  
  setColor(color) {
    this.color = color;
  }
}

class Rectangle extends ShapePrototype {
  constructor(width = 0, height = 0) {
    super();
    this.width = width;
    this.height = height;
    this.type = 'rectangle';
  }
  
  getArea() {
    return this.width * this.height;
  }
}

class Circle extends ShapePrototype {
  constructor(radius = 0) {
    super();
    this.radius = radius;
    this.type = 'circle';
  }
  
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}

// Shape Registry for managing prototypes
class ShapeRegistry {
  constructor() {
    this.shapes = {};
  }
  
  registerShape(name, shape) {
    this.shapes[name] = shape;
  }
  
  createShape(name) {
    const prototype = this.shapes[name];
    if (!prototype) {
      throw new Error(\`Shape '\${name}' not found in registry\`);
    }
    return prototype.clone();
  }
}

// Usage
const registry = new ShapeRegistry();

// Register prototype shapes
const rectanglePrototype = new Rectangle(100, 50);
rectanglePrototype.setColor('#FF0000');
registry.registerShape('red-rectangle', rectanglePrototype);

const circlePrototype = new Circle(30);
circlePrototype.setColor('#0000FF');
registry.registerShape('blue-circle', circlePrototype);

// Create new shapes from prototypes
const rect1 = registry.createShape('red-rectangle');
rect1.move(10, 20);

const rect2 = registry.createShape('red-rectangle');
rect2.move(100, 200);
rect2.setColor('#00FF00'); // Change color of this instance

const circle1 = registry.createShape('blue-circle');
circle1.move(50, 50);

console.log(rect1); // Rectangle at (10, 20) with red color
console.log(rect2); // Rectangle at (100, 200) with green color
console.log(circle1); // Circle at (50, 50) with blue color

// Native JavaScript prototype example
const carPrototype = {
  wheels: 4,
  start() {
    console.log('Engine started');
  },
  clone() {
    return Object.create(this);
  }
};

const car1 = carPrototype.clone();
car1.brand = 'Toyota';
car1.model = 'Camry';

const car2 = carPrototype.clone();
car2.brand = 'Honda';
car2.model = 'Accord';

console.log(car1.wheels); // 4 (inherited from prototype)
console.log(car2.wheels); // 4 (inherited from prototype)`
  },
  // Structural Patterns
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'structural',
    description: 'Allows objects with incompatible interfaces to work together by wrapping an object with an interface that the client expects.',
    benefits: 'The Adapter pattern allows incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces, allowing classes to work together that couldn\'t otherwise because of incompatible interfaces. This is especially useful when integrating new code with old code or third-party libraries.',
    codeExample: `// Adapter Pattern Example

// Old payment interface (legacy code)
class OldPaymentSystem {
  makePayment(amount) {
    console.log(\`Processing payment of $\${amount} through legacy system\`);
    return {
      success: true,
      transactionId: Math.random().toString(36).substr(2, 9)
    };
  }
}

// New payment interface that our application expects
class ModernPaymentInterface {
  processPayment(paymentDetails) {
    throw new Error('Method must be implemented');
  }
}

// Third-party payment service with different interface
class StripePaymentService {
  chargeCard(cardNumber, amount, currency) {
    console.log(\`Charging \${currency}\${amount} to card \${cardNumber.slice(-4)}\`);
    return {
      status: 'succeeded',
      chargeId: 'ch_' + Math.random().toString(36).substr(2, 9)
    };
  }
}

// Adapter for old payment system
class OldPaymentAdapter extends ModernPaymentInterface {
  constructor() {
    super();
    this.oldSystem = new OldPaymentSystem();
  }
  
  processPayment(paymentDetails) {
    // Adapt the modern interface to the old system
    const result = this.oldSystem.makePayment(paymentDetails.amount);
    
    return {
      status: result.success ? 'completed' : 'failed',
      transactionId: result.transactionId,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency || 'USD'
    };
  }
}

// Adapter for Stripe payment service
class StripeAdapter extends ModernPaymentInterface {
  constructor() {
    super();
    this.stripe = new StripePaymentService();
  }
  
  processPayment(paymentDetails) {
    // Adapt the modern interface to Stripe's interface
    const result = this.stripe.chargeCard(
      paymentDetails.cardNumber,
      paymentDetails.amount,
      paymentDetails.currency
    );
    
    return {
      status: result.status === 'succeeded' ? 'completed' : 'failed',
      transactionId: result.chargeId,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency
    };
  }
}

// Payment processor that works with any payment service through adapters
class PaymentProcessor {
  constructor(paymentAdapter) {
    this.adapter = paymentAdapter;
  }
  
  process(paymentDetails) {
    console.log('Processing payment...');
    const result = this.adapter.processPayment(paymentDetails);
    console.log('Payment result:', result);
    return result;
  }
}

// Usage
const paymentDetails = {
  amount: 100,
  currency: 'USD',
  cardNumber: '4111111111111111'
};

// Using old payment system through adapter
const oldPaymentProcessor = new PaymentProcessor(new OldPaymentAdapter());
oldPaymentProcessor.process(paymentDetails);

// Using Stripe through adapter
const stripeProcessor = new PaymentProcessor(new StripeAdapter());
stripeProcessor.process(paymentDetails);

// Another example: Adapting different data formats
class XMLDataSource {
  getXMLData() {
    return \`<users>
      <user>
        <name>John Doe</name>
        <email>john@example.com</email>
      </user>
      <user>
        <name>Jane Smith</name>
        <email>jane@example.com</email>
      </user>
    </users>\`;
  }
}

class JSONDataAdapter {
  constructor(xmlDataSource) {
    this.xmlSource = xmlDataSource;
  }
  
  getData() {
    const xmlData = this.xmlSource.getXMLData();
    // Simplified conversion (in real app, use proper XML parser)
    return {
      users: [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' }
      ]
    };
  }
}

// Usage
const xmlSource = new XMLDataSource();
const jsonAdapter = new JSONDataAdapter(xmlSource);
const jsonData = jsonAdapter.getData();
console.log('Adapted data:', jsonData);`
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'structural',
    description: 'Dynamically adds behaviors or responsibilities to objects without modifying their structure.',
    benefits: 'The Decorator pattern adds new functionality to an existing object without altering its structure. This is useful for extending the behavior of classes in a flexible and reusable way. For instance, you can add logging, data validation, or formatting to objects dynamically without modifying the core class.',
    codeExample: `// Decorator Pattern Example

// Base coffee class
class Coffee {
  constructor() {
    this.description = 'Simple coffee';
    this.cost = 2;
  }
  
  getDescription() {
    return this.description;
  }
  
  getCost() {
    return this.cost;
  }
}

// Base decorator class
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }
  
  getDescription() {
    return this.coffee.getDescription();
  }
  
  getCost() {
    return this.coffee.getCost();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', milk';
  }
  
  getCost() {
    return this.coffee.getCost() + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', sugar';
  }
  
  getCost() {
    return this.coffee.getCost() + 0.2;
  }
}

class WhipCreamDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', whip cream';
  }
  
  getCost() {
    return this.coffee.getCost() + 0.7;
  }
}

class CaramelDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', caramel';
  }
  
  getCost() {
    return this.coffee.getCost() + 0.8;
  }
}

// Usage
let coffee = new Coffee();
console.log(\`\${coffee.getDescription()} - $\${coffee.getCost()}\`);

// Add milk
coffee = new MilkDecorator(coffee);
console.log(\`\${coffee.getDescription()} - $\${coffee.getCost()}\`);

// Add sugar
coffee = new SugarDecorator(coffee);
console.log(\`\${coffee.getDescription()} - $\${coffee.getCost()}\`);

// Add whip cream
coffee = new WhipCreamDecorator(coffee);
console.log(\`\${coffee.getDescription()} - $\${coffee.getCost()}\`);

// Create a complex coffee order
let complexCoffee = new Coffee();
complexCoffee = new MilkDecorator(complexCoffee);
complexCoffee = new MilkDecorator(complexCoffee); // Double milk
complexCoffee = new CaramelDecorator(complexCoffee);
complexCoffee = new WhipCreamDecorator(complexCoffee);
console.log(\`\\nComplex order: \${complexCoffee.getDescription()} - $\${complexCoffee.getCost()}\`);

// Another example: Text formatting decorators
class Text {
  constructor(content) {
    this.content = content;
  }
  
  render() {
    return this.content;
  }
}

class TextDecorator extends Text {
  constructor(text) {
    super();
    this.text = text;
  }
  
  render() {
    return this.text.render();
  }
}

class BoldDecorator extends TextDecorator {
  render() {
    return \`<b>\${this.text.render()}</b>\`;
  }
}

class ItalicDecorator extends TextDecorator {
  render() {
    return \`<i>\${this.text.render()}</i>\`;
  }
}

class UnderlineDecorator extends TextDecorator {
  render() {
    return \`<u>\${this.text.render()}</u>\`;
  }
}

// Usage
let text = new Text('Hello World');
text = new BoldDecorator(text);
text = new ItalicDecorator(text);
text = new UnderlineDecorator(text);
console.log(text.render()); // <u><i><b>Hello World</b></i></u>

// Function decorator example (more JavaScript-like)
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling function \${fn.name} with arguments:\`, args);
    const result = fn.apply(this, args);
    console.log(\`Function \${fn.name} returned:\`, result);
    return result;
  };
}

function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    console.log(\`Function \${fn.name} took \${end - start}ms\`);
    return result;
  };
}

// Original function
function calculateSum(a, b) {
  return a + b;
}

// Decorate the function
const decoratedSum = withTiming(withLogging(calculateSum));
decoratedSum(5, 3);`
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'structural',
    description: 'Provides a simple interface to a complex subsystem, making it easier to use.',
    benefits: 'The Facade pattern provides a simplified interface to a complex subsystem, making it easier to use. It hides the complexities of the subsystem and provides a single point of entry, which is useful in reducing dependencies and improving the readability of the code.',
    codeExample: `// Facade Pattern Example

// Complex subsystem classes
class CPU {
  freeze() {
    console.log('CPU: Freezing processor');
  }
  
  jump(position) {
    console.log(\`CPU: Jumping to position \${position}\`);
  }
  
  execute() {
    console.log('CPU: Executing instructions');
  }
}

class Memory {
  load(position, data) {
    console.log(\`Memory: Loading data "\${data}" at position \${position}\`);
  }
}

class HardDrive {
  read(lba, size) {
    console.log(\`HardDrive: Reading \${size} bytes from LBA \${lba}\`);
    return 'boot data';
  }
}

class GPU {
  initialize() {
    console.log('GPU: Initializing graphics processor');
  }
  
  renderBootScreen() {
    console.log('GPU: Rendering boot screen');
  }
}

class PowerSupply {
  turnOn() {
    console.log('PowerSupply: Providing power to components');
  }
  
  turnOff() {
    console.log('PowerSupply: Cutting power to components');
  }
}

// Facade class
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
    this.gpu = new GPU();
    this.powerSupply = new PowerSupply();
  }
  
  start() {
    console.log('=== Starting Computer ===');
    this.powerSupply.turnOn();
    this.gpu.initialize();
    this.gpu.renderBootScreen();
    this.cpu.freeze();
    this.memory.load(0x00, this.hardDrive.read(0x00, 1024));
    this.cpu.jump(0x00);
    this.cpu.execute();
    console.log('=== Computer Started Successfully ===\\n');
  }
  
  shutdown() {
    console.log('=== Shutting Down Computer ===');
    this.cpu.freeze();
    this.powerSupply.turnOff();
    console.log('=== Computer Shut Down ===\\n');
  }
}

// Usage - Simple interface hiding complexity
const computer = new ComputerFacade();
computer.start();
computer.shutdown();

// Another example: Home Theater Facade
class Amplifier {
  on() { console.log('Amplifier: Turning on'); }
  off() { console.log('Amplifier: Turning off'); }
  setVolume(level) { console.log(\`Amplifier: Setting volume to \${level}\`); }
  setSurroundSound() { console.log('Amplifier: Surround sound enabled'); }
}

class DVDPlayer {
  on() { console.log('DVD Player: Turning on'); }
  off() { console.log('DVD Player: Turning off'); }
  play(movie) { console.log(\`DVD Player: Playing "\${movie}"\`); }
  stop() { console.log('DVD Player: Stopped'); }
}

class Projector {
  on() { console.log('Projector: Turning on'); }
  off() { console.log('Projector: Turning off'); }
  wideScreenMode() { console.log('Projector: Wide screen mode enabled'); }
}

class TheaterLights {
  dim(level) { console.log(\`Lights: Dimming to \${level}%\`); }
  on() { console.log('Lights: Turning on'); }
}

class PopcornMaker {
  on() { console.log('Popcorn Maker: Turning on'); }
  off() { console.log('Popcorn Maker: Turning off'); }
  pop() { console.log('Popcorn Maker: Popping corn!'); }
}

// Home Theater Facade
class HomeTheaterFacade {
  constructor() {
    this.amp = new Amplifier();
    this.dvd = new DVDPlayer();
    this.projector = new Projector();
    this.lights = new TheaterLights();
    this.popcorn = new PopcornMaker();
  }
  
  watchMovie(movie) {
    console.log('=== Get ready to watch a movie! ===');
    
    this.popcorn.on();
    this.popcorn.pop();
    
    this.lights.dim(10);
    
    this.projector.on();
    this.projector.wideScreenMode();
    
    this.amp.on();
    this.amp.setSurroundSound();
    this.amp.setVolume(8);
    
    this.dvd.on();
    this.dvd.play(movie);
    
    console.log('=== Enjoy your movie! ===\\n');
  }
  
  endMovie() {
    console.log('=== Shutting down theater... ===');
    
    this.dvd.stop();
    this.dvd.off();
    
    this.amp.off();
    this.projector.off();
    this.lights.on();
    this.popcorn.off();
    
    console.log('=== Theater shut down ===\\n');
  }
}

// Usage
const homeTheater = new HomeTheaterFacade();
homeTheater.watchMovie('The Matrix');
homeTheater.endMovie();

// API Facade example
class APIFacade {
  constructor() {
    this.baseURL = 'https://api.example.com';
  }
  
  async getUser(userId) {
    try {
      // Hide complex authentication, headers, error handling
      const token = await this._authenticate();
      const response = await fetch(\`\${this.baseURL}/users/\${userId}\`, {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
  
  async _authenticate() {
    // Complex authentication logic hidden
    return 'mock-token';
  }
}

// Simple usage hiding all complexity
const api = new APIFacade();
// api.getUser(123).then(user => console.log(user));`
  },
  {
    id: 'proxy',
    name: 'Proxy',
    category: 'structural',
    description: 'Provides a surrogate or placeholder for another object to control access to it.',
    benefits: 'The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This can be useful for implementing lazy initialization, access control, logging, or even remote proxies.',
    codeExample: `// Proxy Pattern Example

// Virtual Proxy - Lazy Loading
class ExpensiveResource {
  constructor() {
    console.log('ExpensiveResource: Creating expensive resource (takes time)...');
    // Simulate expensive operation
    this.data = this._loadData();
  }
  
  _loadData() {
    // Simulate loading large data
    const data = [];
    for (let i = 0; i < 1000000; i++) {
      data.push(Math.random());
    }
    return data;
  }
  
  process() {
    console.log(\`Processing \${this.data.length} items...\`);
    return this.data.reduce((a, b) => a + b, 0);
  }
}

class LazyResourceProxy {
  constructor() {
    this.resource = null;
  }
  
  process() {
    if (!this.resource) {
      console.log('Proxy: Creating resource on first use...');
      this.resource = new ExpensiveResource();
    }
    return this.resource.process();
  }
}

// Usage
console.log('Creating proxy (instant)...');
const proxy = new LazyResourceProxy();
console.log('Proxy created!');

console.log('\\nFirst call to process():');
proxy.process(); // Resource created here

console.log('\\nSecond call to process():');
proxy.process(); // Resource already exists

// Protection Proxy - Access Control
class BankAccount {
  constructor(balance = 0) {
    this.balance = balance;
  }
  
  deposit(amount) {
    this.balance += amount;
    console.log(\`Deposited: $\${amount}. Balance: $\${this.balance}\`);
  }
  
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(\`Withdrawn: $\${amount}. Balance: $\${this.balance}\`);
    } else {
      console.log('Insufficient funds!');
    }
  }
  
  getBalance() {
    return this.balance;
  }
}

class SecureBankAccountProxy {
  constructor(account, pin) {
    this.account = account;
    this.correctPin = pin;
    this.authenticated = false;
  }
  
  authenticate(pin) {
    this.authenticated = pin === this.correctPin;
    if (this.authenticated) {
      console.log('Authentication successful!');
    } else {
      console.log('Authentication failed!');
    }
    return this.authenticated;
  }
  
  deposit(amount) {
    if (this.authenticated) {
      return this.account.deposit(amount);
    }
    console.log('Please authenticate first!');
  }
  
  withdraw(amount) {
    if (this.authenticated) {
      return this.account.withdraw(amount);
    }
    console.log('Please authenticate first!');
  }
  
  getBalance() {
    if (this.authenticated) {
      return this.account.getBalance();
    }
    console.log('Please authenticate first!');
    return null;
  }
}

// Usage
const account = new BankAccount(1000);
const secureAccount = new SecureBankAccountProxy(account, '1234');

console.log('\\nTrying to access without authentication:');
secureAccount.withdraw(100);

console.log('\\nAuthenticating with wrong PIN:');
secureAccount.authenticate('0000');
secureAccount.withdraw(100);

console.log('\\nAuthenticating with correct PIN:');
secureAccount.authenticate('1234');
secureAccount.withdraw(100);
secureAccount.deposit(500);

// Logging Proxy
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

class LoggingCalculatorProxy {
  constructor(calculator) {
    this.calculator = calculator;
    this.logs = [];
  }
  
  add(a, b) {
    const result = this.calculator.add(a, b);
    this._log('add', [a, b], result);
    return result;
  }
  
  subtract(a, b) {
    const result = this.calculator.subtract(a, b);
    this._log('subtract', [a, b], result);
    return result;
  }
  
  multiply(a, b) {
    const result = this.calculator.multiply(a, b);
    this._log('multiply', [a, b], result);
    return result;
  }
  
  divide(a, b) {
    const result = this.calculator.divide(a, b);
    this._log('divide', [a, b], result);
    return result;
  }
  
  _log(operation, args, result) {
    const logEntry = {
      timestamp: new Date(),
      operation,
      arguments: args,
      result
    };
    this.logs.push(logEntry);
    console.log(\`[\${logEntry.timestamp.toISOString()}] \${operation}(\${args.join(', ')}) = \${result}\`);
  }
  
  getLogs() {
    return this.logs;
  }
}

// Usage
const calc = new Calculator();
const loggedCalc = new LoggingCalculatorProxy(calc);

console.log('\\nPerforming calculations with logging:');
loggedCalc.add(5, 3);
loggedCalc.multiply(4, 7);
loggedCalc.divide(20, 4);

// JavaScript Proxy API Example
const target = {
  name: 'John',
  age: 30,
  _private: 'secret'
};

const handler = {
  get(target, property) {
    if (property.startsWith('_')) {
      console.log(\`Access denied to private property: \${property}\`);
      return undefined;
    }
    console.log(\`Accessing property: \${property}\`);
    return target[property];
  },
  
  set(target, property, value) {
    if (property.startsWith('_')) {
      console.log(\`Cannot set private property: \${property}\`);
      return false;
    }
    console.log(\`Setting property: \${property} = \${value}\`);
    target[property] = value;
    return true;
  }
};

const proxiedObject = new Proxy(target, handler);

console.log('\\nUsing JavaScript Proxy:');
console.log(proxiedObject.name); // Allowed
console.log(proxiedObject._private); // Blocked
proxiedObject.age = 31; // Allowed
proxiedObject._private = 'new secret'; // Blocked`
  },
  // Behavioral Patterns
  {
    id: 'observer',
    name: 'Observer',
    category: 'behavioral',
    description: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This is commonly used in event handling in JavaScript.',
    benefits: 'The Observer pattern defines a one-to-many dependency between objects, so when one object changes state, all its dependents are notified and updated automatically. This is useful for implementing event handling systems or when an object needs to notify other objects without being tightly coupled to them.',
    codeExample: `// Observer Pattern Example

// Subject (Observable)
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
    console.log(\`Observer \${observer.name} subscribed\`);
  }
  
  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(\`Observer \${observer.name} unsubscribed\`);
    }
  }
  
  notify(data) {
    console.log(\`Notifying \${this.observers.length} observers...\`);
    this.observers.forEach(observer => observer.update(data));
  }
}

// Concrete Subject - News Agency
class NewsAgency extends Subject {
  constructor() {
    super();
    this.news = [];
  }
  
  addNews(headline) {
    this.news.push({
      headline,
      timestamp: new Date(),
      id: this.news.length + 1
    });
    this.notify(this.news[this.news.length - 1]);
  }
  
  getLatestNews() {
    return this.news[this.news.length - 1];
  }
}

// Observer interface
class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    throw new Error('Update method must be implemented');
  }
}

// Concrete Observers
class NewsChannel extends Observer {
  update(news) {
    console.log(\`\${this.name} broadcasting: "\${news.headline}" at \${news.timestamp.toLocaleTimeString()}\`);
  }
}

class NewsWebsite extends Observer {
  update(news) {
    console.log(\`\${this.name} posting article: "\${news.headline}" (ID: \${news.id})\`);
  }
}

class MobileApp extends Observer {
  update(news) {
    console.log(\`\${this.name} push notification: "\${news.headline}"\`);
  }
}

// Usage
const newsAgency = new NewsAgency();

const cnn = new NewsChannel('CNN');
const bbcWebsite = new NewsWebsite('BBC Website');
const newsApp = new MobileApp('News App');

// Subscribe observers
newsAgency.subscribe(cnn);
newsAgency.subscribe(bbcWebsite);
newsAgency.subscribe(newsApp);

// Publish news
console.log('\\n--- Publishing news ---');
newsAgency.addNews('Breaking: Major scientific discovery announced!');

console.log('\\n--- Publishing another news ---');
newsAgency.addNews('Sports: Local team wins championship!');

// Unsubscribe one observer
console.log('\\n--- CNN unsubscribing ---');
newsAgency.unsubscribe(cnn);

console.log('\\n--- Publishing news after CNN unsubscribed ---');
newsAgency.addNews('Weather: Storm approaching the east coast');

// Event Emitter Implementation (Node.js style)
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }
  
  emit(event, data) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(listener => listener(data));
  }
}

// Stock Price Example
class StockPrice extends EventEmitter {
  constructor(symbol, price) {
    super();
    this.symbol = symbol;
    this.price = price;
  }
  
  setPrice(price) {
    const oldPrice = this.price;
    this.price = price;
    
    this.emit('price-changed', {
      symbol: this.symbol,
      oldPrice,
      newPrice: price,
      change: price - oldPrice,
      changePercent: ((price - oldPrice) / oldPrice * 100).toFixed(2)
    });
  }
}

// Stock observers
const priceDisplay = (data) => {
  console.log(\`Display: \${data.symbol} $\${data.newPrice} (\${data.changePercent}%)\`);
};

const priceAlert = (data) => {
  if (Math.abs(data.changePercent) > 5) {
    console.log(\`ALERT: \${data.symbol} changed by \${data.changePercent}%!\`);
  }
};

const tradeBot = (data) => {
  if (data.changePercent < -3) {
    console.log(\`Bot: Buying \${data.symbol} at $\${data.newPrice}\`);
  } else if (data.changePercent > 3) {
    console.log(\`Bot: Selling \${data.symbol} at $\${data.newPrice}\`);
  }
};

// Usage
console.log('\\n--- Stock Market Observer ---');
const appleStock = new StockPrice('AAPL', 150);

// Subscribe to price changes
appleStock.on('price-changed', priceDisplay);
appleStock.on('price-changed', priceAlert);
appleStock.on('price-changed', tradeBot);

// Simulate price changes
appleStock.setPrice(152);
appleStock.setPrice(145);
appleStock.setPrice(160);
appleStock.setPrice(155);

// Model-View Pattern Example
class Model {
  constructor() {
    this.observers = [];
    this.data = {};
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  notify(change) {
    this.observers.forEach(observer => observer.update(change));
  }
  
  set(key, value) {
    const oldValue = this.data[key];
    this.data[key] = value;
    this.notify({ key, oldValue, newValue: value });
  }
  
  get(key) {
    return this.data[key];
  }
}

class View {
  constructor(name, model) {
    this.name = name;
    this.model = model;
    this.model.subscribe(this);
  }
  
  update(change) {
    console.log(\`\${this.name} updating: \${change.key} changed from \${change.oldValue} to \${change.newValue}\`);
    this.render();
  }
  
  render() {
    console.log(\`\${this.name} rendered with latest data\`);
  }
}

// Usage
console.log('\\n--- Model-View Observer ---');
const userModel = new Model();
const profileView = new View('ProfileView', userModel);
const headerView = new View('HeaderView', userModel);

userModel.set('username', 'john_doe');
userModel.set('email', 'john@example.com');`
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'behavioral',
    description: 'Defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.',
    benefits: 'The Mediator pattern defines an object that centralizes complex communications and control logic between objects in a system. Rather than having objects refer to each other directly, they communicate through the mediator. This promotes loose coupling and makes it easier to modify interactions without touching each component. It\'s often used in chat applications, UI form elements coordination, and event-based systems.',
    codeExample: `// Mediator Pattern Example

// Chat Room Mediator
class ChatRoom {
  constructor() {
    this.users = {};
    this.messageHistory = [];
  }
  
  register(user) {
    this.users[user.name] = user;
    user.setChatRoom(this);
    this.broadcast('system', \`\${user.name} has joined the chat\`, user);
  }
  
  send(message, from, to = null) {
    const timestamp = new Date().toLocaleTimeString();
    const messageData = {
      from: from.name,
      to: to ? to.name : 'all',
      message,
      timestamp
    };
    
    this.messageHistory.push(messageData);
    
    if (to) {
      // Private message
      to.receive(\`[Private from \${from.name}] \${message}\`, timestamp);
      from.receive(\`[Private to \${to.name}] \${message}\`, timestamp);
    } else {
      // Broadcast to all users except sender
      for (let key in this.users) {
        if (this.users[key] !== from) {
          this.users[key].receive(\`[\${from.name}] \${message}\`, timestamp);
        }
      }
    }
  }
  
  broadcast(type, message, excludeUser = null) {
    const timestamp = new Date().toLocaleTimeString();
    for (let key in this.users) {
      if (this.users[key] !== excludeUser) {
        this.users[key].receive(\`[System] \${message}\`, timestamp);
      }
    }
  }
}

// User class
class User {
  constructor(name) {
    this.name = name;
    this.chatRoom = null;
  }
  
  setChatRoom(chatRoom) {
    this.chatRoom = chatRoom;
  }
  
  send(message, to = null) {
    if (this.chatRoom) {
      if (to) {
        this.chatRoom.send(message, this, to);
      } else {
        this.chatRoom.send(message, this);
      }
    }
  }
  
  receive(message, timestamp) {
    console.log(\`\${this.name} received at \${timestamp}: \${message}\`);
  }
}

// Usage
console.log('=== Chat Room Example ===');
const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const charlie = new User('Charlie');

chatRoom.register(alice);
chatRoom.register(bob);
chatRoom.register(charlie);

alice.send('Hello everyone!');
bob.send('Hey Alice!');
charlie.send('Hi there!', alice); // Private message to Alice

// Air Traffic Control Mediator
class AirTrafficControl {
  constructor() {
    this.aircraft = [];
    this.runwayAvailable = true;
  }
  
  registerAircraft(aircraft) {
    this.aircraft.push(aircraft);
    aircraft.setATCMediator(this);
  }
  
  requestLanding(aircraft) {
    if (this.runwayAvailable) {
      this.runwayAvailable = false;
      console.log(\`ATC: \${aircraft.name} cleared for landing on runway.\`);
      
      // Notify other aircraft
      this.aircraft.forEach(plane => {
        if (plane !== aircraft) {
          plane.notify(\`\${aircraft.name} is landing. Please maintain altitude.\`);
        }
      });
      
      // Simulate landing time
      setTimeout(() => {
        this.runwayAvailable = true;
        console.log(\`ATC: Runway is now clear.\`);
        this.notifyRunwayStatus();
      }, 3000);
      
      return true;
    } else {
      console.log(\`ATC: \${aircraft.name} please circle. Runway occupied.\`);
      return false;
    }
  }
  
  requestTakeoff(aircraft) {
    if (this.runwayAvailable) {
      this.runwayAvailable = false;
      console.log(\`ATC: \${aircraft.name} cleared for takeoff.\`);
      
      // Notify other aircraft
      this.aircraft.forEach(plane => {
        if (plane !== aircraft) {
          plane.notify(\`\${aircraft.name} is taking off. Maintain safe distance.\`);
        }
      });
      
      setTimeout(() => {
        this.runwayAvailable = true;
        console.log(\`ATC: Runway is now clear.\`);
        this.notifyRunwayStatus();
      }, 2000);
      
      return true;
    } else {
      console.log(\`ATC: \${aircraft.name} hold position. Runway occupied.\`);
      return false;
    }
  }
  
  notifyRunwayStatus() {
    this.aircraft.forEach(plane => {
      plane.notify('Runway is now available.');
    });
  }
  
  broadcastWeatherUpdate(weather) {
    console.log(\`ATC: Weather update - \${weather}\`);
    this.aircraft.forEach(plane => {
      plane.notify(\`Weather update: \${weather}\`);
    });
  }
}

class Aircraft {
  constructor(name) {
    this.name = name;
    this.atc = null;
  }
  
  setATCMediator(atc) {
    this.atc = atc;
  }
  
  requestLanding() {
    console.log(\`\${this.name}: Requesting landing permission.\`);
    return this.atc.requestLanding(this);
  }
  
  requestTakeoff() {
    console.log(\`\${this.name}: Requesting takeoff permission.\`);
    return this.atc.requestTakeoff(this);
  }
  
  notify(message) {
    console.log(\`\${this.name} received: \${message}\`);
  }
}

// Usage
console.log('\\n=== Air Traffic Control Example ===');
const atc = new AirTrafficControl();

const flight1 = new Aircraft('United 123');
const flight2 = new Aircraft('Delta 456');
const flight3 = new Aircraft('American 789');

atc.registerAircraft(flight1);
atc.registerAircraft(flight2);
atc.registerAircraft(flight3);

flight1.requestLanding();
flight2.requestLanding(); // Will be denied
atc.broadcastWeatherUpdate('Clear skies, wind 10 knots');

// UI Components Mediator
class FormMediator {
  constructor() {
    this.components = {};
  }
  
  register(name, component) {
    this.components[name] = component;
    component.setMediator(this);
  }
  
  notify(sender, event, data) {
    switch(event) {
      case 'country-changed':
        this.handleCountryChange(data);
        break;
      case 'shipping-changed':
        this.handleShippingChange(data);
        break;
      case 'calculate-total':
        this.calculateTotal();
        break;
    }
  }
  
  handleCountryChange(country) {
    console.log(\`Mediator: Country changed to \${country}\`);
    
    // Update shipping options based on country
    if (country === 'USA') {
      this.components.shippingSelect.setOptions(['Standard', 'Express', 'Overnight']);
    } else {
      this.components.shippingSelect.setOptions(['International Standard', 'International Express']);
    }
    
    // Update tax rate
    const taxRate = country === 'USA' ? 0.08 : 0.15;
    this.components.taxField.setValue(taxRate);
    
    this.calculateTotal();
  }
  
  handleShippingChange(option) {
    console.log(\`Mediator: Shipping changed to \${option}\`);
    const shippingCosts = {
      'Standard': 5,
      'Express': 15,
      'Overnight': 30,
      'International Standard': 20,
      'International Express': 40
    };
    
    this.components.shippingCost.setValue(shippingCosts[option] || 0);
    this.calculateTotal();
  }
  
  calculateTotal() {
    const subtotal = this.components.subtotalField.getValue();
    const tax = subtotal * this.components.taxField.getValue();
    const shipping = this.components.shippingCost.getValue();
    const total = subtotal + tax + shipping;
    
    this.components.totalField.setValue(total);
    console.log(\`Mediator: Total calculated: $\${total.toFixed(2)}\`);
  }
}

class FormComponent {
  constructor(name, value = null) {
    this.name = name;
    this.value = value;
    this.mediator = null;
  }
  
  setMediator(mediator) {
    this.mediator = mediator;
  }
  
  setValue(value) {
    this.value = value;
    console.log(\`\${this.name}: Value set to \${value}\`);
  }
  
  getValue() {
    return this.value;
  }
}

class SelectComponent extends FormComponent {
  constructor(name, options = []) {
    super(name);
    this.options = options;
  }
  
  setOptions(options) {
    this.options = options;
    console.log(\`\${this.name}: Options updated to [\${options.join(', ')}]\`);
  }
  
  select(option) {
    if (this.options.includes(option)) {
      this.value = option;
      console.log(\`\${this.name}: Selected "\${option}"\`);
      this.mediator.notify(this, this.name === 'countrySelect' ? 'country-changed' : 'shipping-changed', option);
    }
  }
}

// Usage
console.log('\\n=== Form Mediator Example ===');
const formMediator = new FormMediator();

// Create components
const countrySelect = new SelectComponent('countrySelect', ['USA', 'Canada', 'Mexico']);
const shippingSelect = new SelectComponent('shippingSelect', []);
const subtotalField = new FormComponent('subtotalField', 100);
const taxField = new FormComponent('taxField', 0);
const shippingCost = new FormComponent('shippingCost', 0);
const totalField = new FormComponent('totalField', 0);

// Register components
formMediator.register('countrySelect', countrySelect);
formMediator.register('shippingSelect', shippingSelect);
formMediator.register('subtotalField', subtotalField);
formMediator.register('taxField', taxField);
formMediator.register('shippingCost', shippingCost);
formMediator.register('totalField', totalField);

// Simulate user interactions
countrySelect.select('USA');
shippingSelect.select('Express');

console.log('\\n--- Changing country to Canada ---');
countrySelect.select('Canada');
shippingSelect.select('International Express');`
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'behavioral',
    description: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. This allows the algorithm to vary independently from clients that use it.',
    benefits: 'The Strategy pattern lets you define a family of algorithms, encapsulate each one, and make them interchangeable. It helps in scenarios where you want to select an algorithm at runtime—like different payment methods, sorting strategies, or authentication techniques. This pattern promotes open/closed principle by allowing the algorithm to change without altering the code that uses it.',
    codeExample: `// Strategy Pattern Example

// Payment Strategy Interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('Pay method must be implemented');
  }
}

// Concrete Payment Strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cvv, expiryDate) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }
  
  pay(amount) {
    console.log(\`Paying $\${amount} using Credit Card\`);
    console.log(\`Card Number: ****\${this.cardNumber.slice(-4)}\`);
    console.log(\`Processing payment...\`);
    return { success: true, transactionId: 'CC_' + Date.now() };
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  pay(amount) {
    console.log(\`Paying $\${amount} using PayPal\`);
    console.log(\`PayPal account: \${this.email}\`);
    console.log(\`Authenticating...\`);
    return { success: true, transactionId: 'PP_' + Date.now() };
  }
}

class CryptoStrategy extends PaymentStrategy {
  constructor(walletAddress, privateKey) {
    super();
    this.walletAddress = walletAddress;
    this.privateKey = privateKey;
  }
  
  pay(amount) {
    console.log(\`Paying $\${amount} using Cryptocurrency\`);
    console.log(\`Wallet: \${this.walletAddress.slice(0, 10)}...\`);
    console.log(\`Broadcasting transaction to blockchain...\`);
    return { success: true, transactionId: 'CRYPTO_' + Date.now() };
  }
}

class ApplePayStrategy extends PaymentStrategy {
  constructor(deviceId, touchId) {
    super();
    this.deviceId = deviceId;
    this.touchId = touchId;
  }
  
  pay(amount) {
    console.log(\`Paying $\${amount} using Apple Pay\`);
    console.log(\`Authenticating with Touch ID...\`);
    console.log(\`Device verified: \${this.deviceId}\`);
    return { success: true, transactionId: 'AP_' + Date.now() };
  }
}

// Context - Shopping Cart
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(item) {
    this.items.push(item);
    console.log(\`Added \${item.name} to cart\`);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  checkout() {
    const total = this.calculateTotal();
    console.log(\`\\nCheckout Summary:\`);
    this.items.forEach(item => {
      console.log(\`- \${item.name} x\${item.quantity}: $\${item.price * item.quantity}\`);
    });
    console.log(\`Total: $\${total}\\n\`);
    
    if (!this.paymentStrategy) {
      console.log('Please select a payment method!');
      return;
    }
    
    const result = this.paymentStrategy.pay(total);
    if (result.success) {
      console.log(\`Payment successful! Transaction ID: \${result.transactionId}\\n\`);
      this.items = []; // Clear cart
    }
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Laptop', price: 999, quantity: 1 });
cart.addItem({ name: 'Mouse', price: 49, quantity: 2 });
cart.addItem({ name: 'Keyboard', price: 79, quantity: 1 });

// Pay with Credit Card
console.log('=== Paying with Credit Card ===');
cart.setPaymentStrategy(new CreditCardStrategy('1234567812345678', '123', '12/25'));
cart.checkout();

// Same items, different payment method
cart.addItem({ name: 'Monitor', price: 299, quantity: 1 });

console.log('=== Paying with PayPal ===');
cart.setPaymentStrategy(new PayPalStrategy('user@example.com', 'password123'));
cart.checkout();

// Sorting Strategy Example
class SortStrategy {
  sort(data) {
    throw new Error('Sort method must be implemented');
  }
}

class BubbleSortStrategy extends SortStrategy {
  sort(data) {
    console.log('Using Bubble Sort');
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSortStrategy extends SortStrategy {
  sort(data) {
    console.log('Using Quick Sort');
    if (data.length <= 1) return data;
    
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(x => x < pivot);
    const middle = data.filter(x => x === pivot);
    const right = data.filter(x => x > pivot);
    
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class MergeSortStrategy extends SortStrategy {
  sort(data) {
    console.log('Using Merge Sort');
    if (data.length <= 1) return data;
    
    const mid = Math.floor(data.length / 2);
    const left = data.slice(0, mid);
    const right = data.slice(mid);
    
    return this.merge(this.sort(left), this.sort(right));
  }
  
  merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

class DataProcessor {
  constructor(strategy) {
    this.sortStrategy = strategy;
  }
  
  setSortStrategy(strategy) {
    this.sortStrategy = strategy;
  }
  
  process(data) {
    console.log(\`Original data: [\${data.join(', ')}]\`);
    const sorted = this.sortStrategy.sort(data);
    console.log(\`Sorted data: [\${sorted.join(', ')}]\\n\`);
    return sorted;
  }
}

// Usage
console.log('\\n=== Sorting Strategy Example ===');
const data = [64, 34, 25, 12, 22, 11, 90];
const processor = new DataProcessor(new BubbleSortStrategy());

processor.process(data);

processor.setSortStrategy(new QuickSortStrategy());
processor.process(data);

processor.setSortStrategy(new MergeSortStrategy());
processor.process(data);

// Compression Strategy Example
class CompressionStrategy {
  compress(file) {
    throw new Error('Compress method must be implemented');
  }
}

class ZipStrategy extends CompressionStrategy {
  compress(file) {
    console.log(\`Compressing \${file} using ZIP algorithm\`);
    return \`\${file}.zip\`;
  }
}

class RarStrategy extends CompressionStrategy {
  compress(file) {
    console.log(\`Compressing \${file} using RAR algorithm\`);
    return \`\${file}.rar\`;
  }
}

class TarGzStrategy extends CompressionStrategy {
  compress(file) {
    console.log(\`Compressing \${file} using TAR.GZ algorithm\`);
    return \`\${file}.tar.gz\`;
  }
}

class FileCompressor {
  constructor() {
    this.strategy = null;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  compressFile(filename) {
    if (!this.strategy) {
      throw new Error('Compression strategy not set');
    }
    
    const compressedFile = this.strategy.compress(filename);
    console.log(\`File compressed to: \${compressedFile}\\n\`);
    return compressedFile;
  }
}

// Usage
console.log('\\n=== Compression Strategy Example ===');
const compressor = new FileCompressor();

compressor.setStrategy(new ZipStrategy());
compressor.compressFile('document.pdf');

compressor.setStrategy(new RarStrategy());
compressor.compressFile('images-folder');

compressor.setStrategy(new TarGzStrategy());
compressor.compressFile('source-code');`
  },
  {
    id: 'command',
    name: 'Command',
    category: 'behavioral',
    description: 'Turns a request into a stand-alone object that contains all the information about the request. This allows for parameterizing clients with queues, requests, and operations.',
    benefits: 'The Command pattern encapsulates a request as an object, thereby allowing you to parameterize clients with queues, requests, and operations. This is useful for implementing undo/redo operations, queuing tasks, or logging changes. Each command object implements a standard interface and contains logic to execute and possibly reverse an action.',
    codeExample: `// Command Pattern Example

// Command Interface
class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }
  
  undo() {
    throw new Error('Undo method must be implemented');
  }
}

// Receiver - Text Editor
class TextEditor {
  constructor() {
    this.content = '';
    this.clipboard = '';
  }
  
  write(text) {
    this.content += text;
  }
  
  delete(length) {
    this.content = this.content.substring(0, this.content.length - length);
  }
  
  copy(start, end) {
    this.clipboard = this.content.substring(start, end);
  }
  
  paste(position) {
    this.content = this.content.slice(0, position) + 
                   this.clipboard + 
                   this.content.slice(position);
  }
  
  getContent() {
    return this.content;
  }
}

// Concrete Commands
class WriteCommand extends Command {
  constructor(receiver, text) {
    super();
    this.receiver = receiver;
    this.text = text;
  }
  
  execute() {
    this.receiver.write(this.text);
    console.log(\`Executed: Write "\${this.text}"\`);
  }
  
  undo() {
    this.receiver.delete(this.text.length);
    console.log(\`Undone: Write "\${this.text}"\`);
  }
}

class DeleteCommand extends Command {
  constructor(receiver, length) {
    super();
    this.receiver = receiver;
    this.length = length;
    this.deletedText = '';
  }
  
  execute() {
    const content = this.receiver.getContent();
    this.deletedText = content.slice(-this.length);
    this.receiver.delete(this.length);
    console.log(\`Executed: Delete \${this.length} characters\`);
  }
  
  undo() {
    this.receiver.write(this.deletedText);
    console.log(\`Undone: Delete (restored "\${this.deletedText}")\`);
  }
}

class CopyCommand extends Command {
  constructor(receiver, start, end) {
    super();
    this.receiver = receiver;
    this.start = start;
    this.end = end;
  }
  
  execute() {
    this.receiver.copy(this.start, this.end);
    const copied = this.receiver.getContent().substring(this.start, this.end);
    console.log(\`Executed: Copy "\${copied}"\`);
  }
  
  undo() {
    console.log('Copy operation cannot be undone');
  }
}

class PasteCommand extends Command {
  constructor(receiver, position) {
    super();
    this.receiver = receiver;
    this.position = position;
    this.pastedLength = 0;
  }
  
  execute() {
    const clipboardContent = this.receiver.clipboard;
    this.pastedLength = clipboardContent.length;
    this.receiver.paste(this.position);
    console.log(\`Executed: Paste "\${clipboardContent}" at position \${this.position}\`);
  }
  
  undo() {
    const content = this.receiver.getContent();
    const before = content.slice(0, this.position);
    const after = content.slice(this.position + this.pastedLength);
    this.receiver.content = before + after;
    console.log(\`Undone: Paste at position \${this.position}\`);
  }
}

// Invoker - Editor Application
class EditorApplication {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  executeCommand(command) {
    // Remove any commands after current index (for redo consistency)
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // Execute and add to history
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }
  
  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
      return true;
    }
    console.log('Nothing to undo');
    return false;
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
      return true;
    }
    console.log('Nothing to redo');
    return false;
  }
}

// Usage
console.log('=== Text Editor Command Example ===');
const editor = new TextEditor();
const app = new EditorApplication();

// Execute commands
app.executeCommand(new WriteCommand(editor, 'Hello '));
app.executeCommand(new WriteCommand(editor, 'World!'));
console.log(\`Content: "\${editor.getContent()}"\\n\`);

app.executeCommand(new CopyCommand(editor, 0, 5)); // Copy "Hello"
app.executeCommand(new PasteCommand(editor, 12)); // Paste at end
console.log(\`Content: "\${editor.getContent()}"\\n\`);

app.executeCommand(new DeleteCommand(editor, 5)); // Delete "Hello"
console.log(\`Content: "\${editor.getContent()}"\\n\`);

// Undo operations
console.log('--- Undoing operations ---');
app.undo(); // Undo delete
console.log(\`Content: "\${editor.getContent()}"\`);

app.undo(); // Undo paste
console.log(\`Content: "\${editor.getContent()}"\`);

app.undo(); // Undo copy (no effect)
app.undo(); // Undo "World!"
console.log(\`Content: "\${editor.getContent()}"\\n\`);

// Redo operations
console.log('--- Redoing operations ---');
app.redo(); // Redo "World!"
console.log(\`Content: "\${editor.getContent()}"\`);

app.redo(); // Redo copy
app.redo(); // Redo paste
console.log(\`Content: "\${editor.getContent()}"\\n\`);

// Smart Home Command Example
class Light {
  constructor(location) {
    this.location = location;
    this.isOn = false;
    this.brightness = 0;
  }
  
  turnOn() {
    this.isOn = true;
    this.brightness = 100;
    console.log(\`\${this.location} light is ON (brightness: \${this.brightness}%)\`);
  }
  
  turnOff() {
    this.isOn = false;
    this.brightness = 0;
    console.log(\`\${this.location} light is OFF\`);
  }
  
  dim(level) {
    this.brightness = level;
    console.log(\`\${this.location} light dimmed to \${level}%\`);
  }
}

class Fan {
  constructor(location) {
    this.location = location;
    this.isOn = false;
    this.speed = 0;
  }
  
  turnOn() {
    this.isOn = true;
    this.speed = 3;
    console.log(\`\${this.location} fan is ON (speed: \${this.speed})\`);
  }
  
  turnOff() {
    this.isOn = false;
    this.speed = 0;
    console.log(\`\${this.location} fan is OFF\`);
  }
  
  setSpeed(speed) {
    this.speed = speed;
    console.log(\`\${this.location} fan speed set to \${speed}\`);
  }
}

// Smart Home Commands
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOn();
  }
  
  undo() {
    this.light.turnOff();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOff();
  }
  
  undo() {
    this.light.turnOn();
  }
}

class DimLightCommand extends Command {
  constructor(light, level) {
    super();
    this.light = light;
    this.level = level;
    this.previousLevel = 0;
  }
  
  execute() {
    this.previousLevel = this.light.brightness;
    this.light.dim(this.level);
  }
  
  undo() {
    this.light.dim(this.previousLevel);
  }
}

class FanOnCommand extends Command {
  constructor(fan) {
    super();
    this.fan = fan;
  }
  
  execute() {
    this.fan.turnOn();
  }
  
  undo() {
    this.fan.turnOff();
  }
}

// Macro Command - Execute multiple commands
class MacroCommand extends Command {
  constructor(commands) {
    super();
    this.commands = commands;
  }
  
  execute() {
    console.log('Executing macro command...');
    this.commands.forEach(cmd => cmd.execute());
  }
  
  undo() {
    console.log('Undoing macro command...');
    // Undo in reverse order
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }
}

// Remote Control
class RemoteControl {
  constructor() {
    this.commands = {};
    this.lastCommand = null;
  }
  
  setCommand(slot, command) {
    this.commands[slot] = command;
  }
  
  pressButton(slot) {
    if (this.commands[slot]) {
      this.commands[slot].execute();
      this.lastCommand = this.commands[slot];
    } else {
      console.log(\`No command set for slot \${slot}\`);
    }
  }
  
  pressUndo() {
    if (this.lastCommand) {
      this.lastCommand.undo();
    } else {
      console.log('No command to undo');
    }
  }
}

// Usage
console.log('\\n=== Smart Home Command Example ===');
const livingRoomLight = new Light('Living Room');
const bedroomLight = new Light('Bedroom');
const ceilingFan = new Fan('Living Room');

const remote = new RemoteControl();

// Set up commands
remote.setCommand(1, new LightOnCommand(livingRoomLight));
remote.setCommand(2, new LightOffCommand(livingRoomLight));
remote.setCommand(3, new DimLightCommand(livingRoomLight, 50));
remote.setCommand(4, new FanOnCommand(ceilingFan));

// Create a "Party Mode" macro
const partyMode = new MacroCommand([
  new LightOnCommand(livingRoomLight),
  new LightOnCommand(bedroomLight),
  new DimLightCommand(livingRoomLight, 30),
  new FanOnCommand(ceilingFan)
]);
remote.setCommand(5, partyMode);

// Use the remote
console.log('--- Using remote control ---');
remote.pressButton(1); // Living room light on
remote.pressButton(3); // Dim to 50%
remote.pressButton(4); // Fan on
remote.pressUndo();    // Fan off

console.log('\\n--- Activating party mode ---');
remote.pressButton(5); // Execute macro

console.log('\\n--- Ending party mode ---');
remote.pressUndo(); // Undo entire macro`
  }
];

export function getPatternsByCategory(category: Pattern['category']): Pattern[] {
  return patterns.filter(p => p.category === category);
}

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find(p => p.id === id);
} 