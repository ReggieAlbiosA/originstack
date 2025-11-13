'use client';

/**
 * TypeScript Fundamental: Variance Annotations
 * - Covariance (out) and Contravariance (in)
 * - Type parameter variance in generic types
 */

import { ReactNode, useState } from 'react';

// Covariance - Producer (out position)
// Can produce a more specific type
interface Producer<out T> {
    produce(): T;
}

class AnimalProducer implements Producer<Animal> {
    produce(): Animal {
        return { name: 'Generic Animal', sound: 'Some sound' };
    }
}

class DogProducer implements Producer<Dog> {
    produce(): Dog {
        return { name: 'Dog', sound: 'Woof', breed: 'Labrador' };
    }
}

// Contravariance - Consumer (in position)
// Can consume a more general type
interface Consumer<in T> {
    consume(item: T): void;
}

class AnimalConsumer implements Consumer<Animal> {
    consume(item: Animal): void {
        console.log(`Animal: ${item.name} says ${item.sound}`);
    }
}

class DogConsumer implements Consumer<Dog> {
    consume(item: Dog): void {
        console.log(`Dog: ${item.name}, breed: ${item.breed}`);
    }
}

// Invariance - both producer and consumer
interface Storage<T> {
    get(): T;
    set(item: T): void;
}

interface Animal {
    name: string;
    sound: string;
}

interface Dog extends Animal {
    breed: string;
}

interface Cat extends Animal {
    indoor: boolean;
}

// Covariant example - readonly container
interface ReadonlyBox<out T> {
    readonly value: T;
    map<U>(fn: (value: T) => U): ReadonlyBox<U>;
}

class Box<T> implements ReadonlyBox<T> {
    constructor(public readonly value: T) { }

    map<U>(fn: (value: T) => U): ReadonlyBox<U> {
        return new Box(fn(this.value));
    }
}

// Contravariant example - event handler
interface EventHandler<in E> {
    handle(event: E): void;
}

interface ClickEvent {
    type: 'click';
    x: number;
    y: number;
}

interface MouseEvent extends ClickEvent {
    button: number;
}

export default function VarianceAnnotations() {
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLog((prev) => [...prev, message]);
    };

    // Covariance demonstration
    const dogProducer: Producer<Dog> = new DogProducer();
    const animalProducer: Producer<Animal> = dogProducer; // OK: Dog is subtype of Animal

    const producedAnimal = animalProducer.produce();

    // Contravariance demonstration
    const animalConsumer: Consumer<Animal> = new AnimalConsumer();
    const dogConsumer: Consumer<Dog> = animalConsumer; // OK: can consume Dog as Animal

    const dog: Dog = { name: 'Buddy', sound: 'Woof', breed: 'Golden Retriever' };
    dogConsumer.consume(dog);

    // Covariant Box example
    const dogBox: ReadonlyBox<Dog> = new Box<Dog>({
        name: 'Rex',
        sound: 'Bark',
        breed: 'German Shepherd',
    });

    const animalBox: ReadonlyBox<Animal> = dogBox; // OK: covariant

    // Event handler contravariance
    const mouseHandler: EventHandler<MouseEvent> = {
        handle(event: MouseEvent) {
            addLog(`Mouse event: ${event.type} at (${event.x}, ${event.y}), button: ${event.button}`);
        },
    };

    const clickHandler: EventHandler<ClickEvent> = {
        handle(event: ClickEvent) {
            addLog(`Click event: ${event.type} at (${event.x}, ${event.y})`);
        },
    };

    // This would work with proper contravariance:
    // const specificHandler: EventHandler<ClickEvent> = mouseHandler; // Can handle ClickEvent too

    return (
        <div>
            <h2>Variance Annotations Demo</h2>

            <div>
                <h3>Covariance (Producer)</h3>
                <p>A Producer of Dog can be used as a Producer of Animal</p>
                <button onClick={() => addLog(`Produced: ${JSON.stringify(producedAnimal)}`)}>
                    Produce Animal
                </button>
            </div>

            <div>
                <h3>Contravariance (Consumer)</h3>
                <p>A Consumer of Animal can be used as a Consumer of Dog</p>
                <button onClick={() => dogConsumer.consume(dog)}>
                    Consume Dog
                </button>
            </div>

            <div>
                <h3>Covariant Box</h3>
                <p>ReadonlyBox is covariant in T</p>
                <p>Dog Box Value: {dogBox.value.name} - {dogBox.value.breed}</p>
                <p>Animal Box Value: {animalBox.value.name}</p>
            </div>

            <div>
                <h3>Event Handler (Contravariant)</h3>
                <button
                    onClick={() =>
                        clickHandler.handle({ type: 'click', x: 100, y: 200 })
                    }
                >
                    Trigger Click Event
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Event Log</h3>
                <div style={{ background: '#f0f0f0', padding: '10px', maxHeight: '200px', overflow: 'auto' }}>
                    {log.map((entry, index) => (
                        <div key={index}>{entry}</div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd' }}>
                <h4>Variance Explained:</h4>
                <ul>
                    <li><strong>Covariance (out):</strong> Producers - can return more specific types</li>
                    <li><strong>Contravariance (in):</strong> Consumers - can accept more general types</li>
                    <li><strong>Invariance:</strong> Both producer and consumer - must be exact type</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * USE CASES:
 *
 * 1. Event Handlers - Type event handlers that can accept more general events
 * 2. Callbacks - Type callbacks that produce or consume specific types
 * 3. Generic Collections - Type read-only collections (covariant)
 * 4. Observer Pattern - Type observers that can handle various event types
 * 5. Factory Functions - Type factories that produce subtypes
 * 6. Stream Processing - Type data streams with type transformations
 * 7. Component Props - Type render props with variance constraints
 * 8. Plugin Systems - Type plugin interfaces with covariant/contravariant types
 *
 * WHEN TO USE:
 * - When working with generic types in producer/consumer patterns
 * - For understanding why some generic assignments fail
 * - When building libraries with complex generic APIs
 * - For type-safe event systems and observers
 * - When you need to explicitly control type variance
 *
 * NOTE: Variance annotations (in/out) are relatively new in TypeScript 4.7+
 */

