import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/reviews - Fetch approved reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        role: true,
        comment: true,
        rating: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener las reseñas',
      },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, comment, rating, email } = body;

    // Validation
    if (!name || !role || !comment || !rating) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todos los campos requeridos deben ser completados',
        },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'El nombre debe tener entre 2 y 100 caracteres',
        },
        { status: 400 }
      );
    }

    if (role.length < 2 || role.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'El rol debe tener entre 2 y 100 caracteres',
        },
        { status: 400 }
      );
    }

    if (comment.length < 10 || comment.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          error: 'El comentario debe tener entre 10 y 1000 caracteres',
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        {
          success: false,
          error: 'La calificación debe ser un número entero entre 1 y 5',
        },
        { status: 400 }
      );
    }

    // Email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'El email no tiene un formato válido',
        },
        { status: 400 }
      );
    }

    // Create review (will need approval)
    const review = await prisma.review.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        comment: comment.trim(),
        rating,
        email: email?.trim() || null,
        approved: false, // Requires manual approval
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Reseña enviada exitosamente. Será revisada antes de publicarse.',
        data: {
          id: review.id,
          name: review.name,
          role: review.role,
          comment: review.comment,
          rating: review.rating,
          createdAt: review.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
